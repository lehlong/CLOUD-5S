import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PartnerModel} from 'src/app/models/MD/partner.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {CustomerFilter} from '../../@filter/SO/customer.filter';
@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  constructor(private _commonService: CommonService) {}

  ExportExcel(pagination?: CustomerFilter) {
    return this._commonService.getFileRequest(`Partner/Export`, pagination);
  }

  search(pagination?: CustomerFilter) {
    return this._commonService.getRequest(`Partner/Search`, pagination);
  }

  Insert(parameters?: PartnerModel) {
    return this._commonService.postRequest(`Partner/Insert`, parameters);
  }

  Update(parameters?: PartnerModel) {
    return this._commonService.putRequest(`Partner/Update`, parameters);
  }
  Delete(parameters?: PartnerModel) {
    return this._commonService.deleteRequest(`Partner/Delete/${parameters?.code}`, parameters);
  }
}
