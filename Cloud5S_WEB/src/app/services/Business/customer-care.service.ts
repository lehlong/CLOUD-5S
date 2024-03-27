import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {CustomerCareModel} from 'src/app/models/Business/customer-care.model';
import {CustomerCareFilter} from '../../@filter/Business/customer-care.filter';
@Injectable({
  providedIn: 'root',
})
export class CustomerCareService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: CustomerCareFilter) {
    return this._commonService.getRequest(`CustomerCare/Search`, pagination);
  }

  Insert(parameters?: CustomerCareModel) {
    return this._commonService.postRequest(`CustomerCare/Insert`, parameters);
  }

  Update(parameters?: CustomerCareModel) {
    return this._commonService.putRequest(`CustomerCare/Update`, parameters);
  }
  Delete(parameters?: CustomerCareModel) {
    return this._commonService.deleteRequest(`CustomerCare/Delete`, parameters);
  }
  ExportExcel(pagination?: CustomerCareModel) {
    return this._commonService.getFileRequest(`CustomerCare/Export`, pagination);
  }
}
