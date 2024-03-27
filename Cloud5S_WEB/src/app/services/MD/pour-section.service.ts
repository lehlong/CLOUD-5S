import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PourSectionModel} from 'src/app/models/MD/pour-section.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class PourSectionService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`PourSection/Search`, pagination);
  }

  Insert(parameters?: PourSectionModel) {
    return this._commonService.postRequest(`PourSection/Insert`, parameters);
  }

  Update(parameters?: PourSectionModel) {
    return this._commonService.putRequest(`PourSection/Update`, parameters);
  }
  Delete(parameters?: PourSectionModel) {
    return this._commonService.deleteRequest(`PourSection/Delete/${parameters?.code}`, parameters);
  }
  ExportExcel(pagination?: PourSectionModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`PourSection/Export`, pagination);
  }
  getAll(isLoading?: boolean) {
    return this._commonService.getRequest(`PourSection/GetAll`);
  }
}
