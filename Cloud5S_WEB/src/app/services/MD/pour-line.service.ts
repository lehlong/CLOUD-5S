import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PourlineModel} from 'src/app/models/MD/pour-line.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class PourlineService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`PourLine/Search`, pagination);
  }

  Insert(parameters?: PourlineModel) {
    return this._commonService.postRequest(`PourLine/Insert`, parameters);
  }

  Update(parameters?: PourlineModel) {
    return this._commonService.putRequest(`PourLine/Update`, parameters);
  }
  Delete(parameters?: PourlineModel) {
    return this._commonService.deleteRequest(`PourLine/Delete/${parameters?.code}`, parameters);
  }
  ExportExcel(pagination?: PourlineModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`PourLine/Export`, pagination);
  }
  getAll(isLoading?: boolean) {
    return this._commonService.getRequest(`PourLine/GetAll`);
  }
}
