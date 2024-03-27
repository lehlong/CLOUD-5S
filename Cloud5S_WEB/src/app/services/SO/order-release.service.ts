import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderModel} from 'src/app/models/SO/order.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {LIST_STATE} from 'src/app/utils/constant';
import {ORDER_RELEASE_STATES, OR_STATE_FILTER} from 'src/app/utils/constant/orderRelease';
import {UpdateStepModel} from 'src/app/models/SO/order-release.model';

@Injectable({
  providedIn: 'root',
})
export class OrderReleaseService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: any) {
    let queryParams = new HttpParams();
    if (pagination.States.length == 0) {
      pagination.States = OR_STATE_FILTER.map((i: any) => i.value);
      return this._commonService.getRequest(`Order/Release`, pagination);
    } else {
      queryParams = queryParams.appendAll({States: pagination.States});
      return this._commonService.getRequest(`Order/Release?` + queryParams.toString(), pagination);
    }
  }

  Insert(parameters?: OrderModel) {
    return this._commonService.postRequest(`OrderRelease/Insert`, parameters);
  }

  Update(parameters?: OrderModel) {
    return this._commonService.putRequest(`OrderRelease/Update`, parameters);
  }

  UpdateStep(parameters?: UpdateStepModel) {
    return this._commonService.putRequest(`OrderRelease/UpdateStep`, parameters);
  }

  CancelStep(code?: string) {
    return this._commonService.putRequest(`OrderRelease/CancelState`, {code: code});
  }

  CompleteStep(parameters?: UpdateStepModel) {
    return this._commonService.putRequest(`OrderRelease/CompleteState`, parameters);
  }

  MixedState(code?: string) {
    return this._commonService.putRequest(`OrderRelease/MixedState`, {code: code});
  }

  Delete(parameters?: OrderModel) {
    return this._commonService.deleteRequest(`OrderRelease/Delete`, parameters);
  }

  GetDetail(code: string) {
    return this._commonService.getRequest(`OrderRelease/GetDetail?code=${code}`);
  }

  ExportExcel(pagination?: any) {
    return this._commonService.getFileRequest(`OrderRelease/Export`, pagination);
  }
}
