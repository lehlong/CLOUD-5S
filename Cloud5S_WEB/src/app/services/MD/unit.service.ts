import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitModel} from 'src/app/models/MD/unit.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Unit/Search`, pagination);
  }

  Insert(parameters?: UnitModel) {
    return this._commonService.postRequest(`Unit/Insert`, parameters);
  }

  Update(parameters?: UnitModel) {
    return this._commonService.putRequest(`Unit/Update`, parameters);
  }

  Delete(parameters?: UnitModel) {
    return this._commonService.deleteRequest(`Unit/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: UnitModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Unit/Export`, pagination);
  }

  getAll(isLoading?: boolean) {
    return this._commonService.getRequest(`Unit/GetAll`);
  }
}
