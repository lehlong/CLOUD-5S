import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PricePolicyModel} from 'src/app/models/MD/price-policy.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class PricePolicyService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`PricePolicy/Search`, pagination);
  }

  Insert(parameters?: PricePolicyModel) {
    return this._commonService.postRequest(`PricePolicy/Insert`, parameters);
  }

  Update(parameters?: PricePolicyModel) {
    return this._commonService.putRequest(`PricePolicy/Update`, parameters);
  }
  Delete(parameters?: PricePolicyModel) {
    return this._commonService.deleteRequest(`PricePolicy/Delete/${parameters?.id}`, parameters);
  }

  ExportExcel(pagination?: PricePolicyModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`PricePolicy/Export`, pagination);
  }
}
