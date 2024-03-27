import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {CustomerModel} from 'src/app/models/MD/customer.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {CustomerFilter} from '../../@filter/SO/customer.filter';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: CustomerFilter) {
    return this._commonService.getRequest(`Partner/Search`, pagination);
  }

  Insert(parameters?: CustomerModel) {
    return this._commonService.postRequest(`Partner/Insert`, parameters);
  }

  Update(parameters?: CustomerModel) {
    return this._commonService.putRequest(`Partner/Update`, parameters);
  }
  Delete(parameters?: CustomerModel) {
    return this._commonService.deleteRequest(`Partner/Delete/${parameters?.code}`, parameters);
  }
}
