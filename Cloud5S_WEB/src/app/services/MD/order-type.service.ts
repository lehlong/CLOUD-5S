import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderTypeModel} from 'src/app/models/MD/order-type.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class OrderTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`OrderType/Search`, pagination);
  }

  Insert(parameters?: OrderTypeModel) {
    return this._commonService.postRequest(`OrderType/Insert`, parameters);
  }

  Update(parameters?: OrderTypeModel) {
    return this._commonService.putRequest(`OrderType/Update`, parameters);
  }
  Delete(parameters?: OrderTypeModel) {
    return this._commonService.deleteRequest(`OrderType/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: OrderTypeModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`OrderType/Export`, pagination);
  }
}
