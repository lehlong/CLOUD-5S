import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {AreaModel} from 'src/app/models/MD/area.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Area/Search`, pagination);
  }

  Insert(parameters?: AreaModel) {
    return this._commonService.postRequest(`Area/Insert`, parameters);
  }

  Update(parameters?: AreaModel) {
    return this._commonService.putRequest(`Area/Update`, parameters);
  }
  Delete(parameters?: AreaModel) {
    return this._commonService.deleteRequest(`Area/Delete/${parameters?.code}`, parameters);
  }
  ExportExcel(pagination?: AreaModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Area/Export`, pagination);
  }
  getAll(isLoading?: boolean) {
    return this._commonService.getRequest(`Area/GetAll`);
  }
}
