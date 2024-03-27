import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {BusinessModel} from 'src/app/models/AD/business.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Business/Search`, pagination);
  }

  Insert(parameters?: BusinessModel) {
    return this._commonService.postRequest(`Business/Insert`, parameters);
  }

  Update(parameters?: BusinessModel) {
    return this._commonService.putRequest(`Business/Update`, parameters);
  }
  Delete(parameters?: BusinessModel) {
    return this._commonService.deleteRequest(`Business/Delete/${parameters?.code}`, parameters);
  }
  ExportExcel(pagination?: BusinessModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Business/Export`, pagination);
  }
  getAll(isLoading?: boolean) {
    return this._commonService.getRequest(`Business/GetAll`);
  }
}
