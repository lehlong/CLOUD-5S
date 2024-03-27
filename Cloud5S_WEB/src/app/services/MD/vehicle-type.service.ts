import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {VehicleTypeModel} from 'src/app/models/MD/vehicle-type.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`VehicleType/Search`, pagination);
  }

  Insert(parameters?: VehicleTypeModel) {
    return this._commonService.postRequest(`VehicleType/Insert`, parameters);
  }

  Update(parameters?: VehicleTypeModel) {
    return this._commonService.putRequest(`VehicleType/Update`, parameters);
  }

  Delete(parameters?: VehicleTypeModel) {
    return this._commonService.deleteRequest(`VehicleType/Delete/${parameters?.code}`, parameters);
  }

  getAll(isLoading?: boolean) {
    return this._commonService.getRequest(`VehicleType/GetAll`);
  }

  ExportExcel(pagination?: VehicleTypeModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`VehicleType/Export`, pagination);
  }
}
