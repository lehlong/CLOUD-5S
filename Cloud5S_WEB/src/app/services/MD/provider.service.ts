import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ProviderModel} from 'src/app/models/MD/provider.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ProviderFilter} from '../../@filter/MD/provider.filter';
@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: ProviderFilter) {
    return this._commonService.getRequest(`Partner/Search`, pagination);
  }

  Insert(parameters?: ProviderModel) {
    return this._commonService.postRequest(`Partner/Insert`, parameters);
  }

  Update(parameters?: ProviderModel) {
    return this._commonService.putRequest(`Partner/Update`, parameters);
  }
  Delete(parameters?: ProviderModel) {
    return this._commonService.deleteRequest(`Partner/Delete/${parameters?.code}`, parameters);
  }
}
