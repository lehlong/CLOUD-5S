import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {DeviceGroupModel} from 'src/app/models/MD/device-group.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class DeviceGroupService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`DeviceGroup/Search`, pagination);
  }

  Insert(parameters?: DeviceGroupModel) {
    return this._commonService.postRequest(`DeviceGroup/Insert`, parameters);
  }

  Update(parameters?: DeviceGroupModel) {
    return this._commonService.putRequest(`DeviceGroup/Update`, parameters);
  }

  Delete(parameters?: DeviceGroupModel) {
    return this._commonService.deleteRequest(`DeviceGroup/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: DeviceGroupModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`DeviceGroup/Export`, pagination);
  }
}
