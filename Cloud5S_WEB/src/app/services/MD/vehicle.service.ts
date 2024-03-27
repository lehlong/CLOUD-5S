import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitFilter} from 'src/app/@filter/MD/unit.filter';
import {VehicleModel} from 'src/app/models/MD/vehicle.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Vehicle/Search`, pagination);
  }

  Insert(parameters?: VehicleModel) {
    return this._commonService.postRequest(`Vehicle/Insert`, parameters);
  }

  Update(parameters?: VehicleModel) {
    return this._commonService.putRequest(`Vehicle/Update`, parameters);
  }

  Delete(parameters?: VehicleModel) {
    return this._commonService.deleteRequest(`Vehicle/Delete/${parameters?.code}`, parameters);
  }

  GetDetail(code: string) {
    return this._commonService.getRequest(`Vehicle/GetDetail?code=${code}`);
  }

  ExportExcel(pagination?: VehicleModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Vehicle/Export`, pagination);
  }
}
