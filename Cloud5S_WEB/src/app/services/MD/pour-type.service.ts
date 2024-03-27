import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PourTypeModel} from 'src/app/models/MD/pour-type.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class PourTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`PourType/Search`, pagination);
  }

  Insert(parameters?: PourTypeModel) {
    return this._commonService.postRequest(`PourType/Insert`, parameters);
  }

  Update(parameters?: PourTypeModel) {
    return this._commonService.putRequest(`PourType/Update`, parameters);
  }
  Delete(parameters?: PourTypeModel) {
    return this._commonService.deleteRequest(`PourType/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: PourTypeModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`PourType/Export`, pagination);
  }
}
