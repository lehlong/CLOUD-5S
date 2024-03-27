import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PaymentPayDetailFilter, PaymentPayIndexSearchFilter} from '../../@filter/Business/payment-pay.filter';
@Injectable({
  providedIn: 'root',
})
export class PaymentPayService {
  constructor(private _commonService: CommonService) {}

  search(filter?: PaymentPayIndexSearchFilter) {
    return this._commonService.getRequest(`OrderImport/DebtCloseImport`, filter);
  }

  getDetail(parameters?: PaymentPayDetailFilter) {
    console.log(parameters);
    return this._commonService.getRequest(`OrderImport/DebtCloseImportDetail`, parameters);
  }

  ExportExcel(pagination?: PaymentPayIndexSearchFilter) {
    return this._commonService.getFileRequest(`OrderImport/DebtCloseImportExcel`, pagination);
  }
}
