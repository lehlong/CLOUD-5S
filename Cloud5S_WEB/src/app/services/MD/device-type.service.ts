import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {DeviceTypeModel} from 'src/app/models/MD/device-type.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`DeviceType/Search`, pagination);
  }

  Insert(parameters?: DeviceTypeModel) {
    return this._commonService.postRequest(`DeviceType/Insert`, parameters);
  }

  Update(parameters?: DeviceTypeModel) {
    return this._commonService.putRequest(`DeviceType/Update`, parameters);
  }

  Delete(parameters?: DeviceTypeModel) {
    return this._commonService.deleteRequest(`DeviceType/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: DeviceTypeModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`DeviceType/Export`, pagination);
  }
}
