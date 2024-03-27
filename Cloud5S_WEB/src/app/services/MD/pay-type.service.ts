import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PayModel} from 'src/app/models/MD/pay.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class PayTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`PayType/Search`, pagination);
  }

  Insert(parameters?: PayModel, isLoading?: boolean) {
    return this._commonService.postRequest(`PayType/Insert`, parameters);
  }

  Update(parameters?: PayModel, isLoading?: boolean) {
    return this._commonService.putRequest(`PayType/Update`, parameters);
  }

  Delete(parameters?: PayModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`PayType/Delete/${parameters?.id}`, parameters);
  }

  ExportExcel(pagination?: PayModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`PayType/Export`, pagination);
  }
}
