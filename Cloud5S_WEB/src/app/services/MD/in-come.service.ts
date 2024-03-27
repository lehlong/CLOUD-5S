import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {IncomeModel} from 'src/app/models/MD/in-come.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class IncomeTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`IncomeType/Search`, pagination);
  }

  Insert(parameters?: IncomeModel, isLoading?: boolean) {
    return this._commonService.postRequest(`IncomeType/Insert`, parameters);
  }

  Update(parameters?: IncomeModel, isLoading?: boolean) {
    return this._commonService.putRequest(`IncomeType/Update`, parameters);
  }

  Delete(parameters?: IncomeModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`IncomeType/Delete/${parameters?.id}`, parameters);
  }

  ExportExcel(pagination?: IncomeModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`IncomeType/Export`, pagination);
  }
}
