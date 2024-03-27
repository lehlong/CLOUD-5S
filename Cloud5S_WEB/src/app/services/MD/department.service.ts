import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {DepartmentModel} from 'src/app/models/MD/department.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Department/Search`, pagination);
  }

  Insert(parameters?: DepartmentModel) {
    return this._commonService.postRequest(`Department/Insert`, parameters);
  }

  Update(parameters?: DepartmentModel) {
    return this._commonService.putRequest(`Department/Update`, parameters);
  }
  Delete(parameters?: DepartmentModel) {
    return this._commonService.deleteRequest(`Department/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: DepartmentModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Department/Export`, pagination);
  }
}
