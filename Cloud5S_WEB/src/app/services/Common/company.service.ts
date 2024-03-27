import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {CompanyDetail} from 'src/app/@filter/Common/company.filter';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private _commonService: CommonService) {}
  GetDetail() {
    return this._commonService.getRequest(`CompanyInfo/GetDetail`);
  }
  Update(parameters?: CompanyDetail) {
    return this._commonService.putRequest(`CompanyInfo/Update`, parameters);
  }
}
