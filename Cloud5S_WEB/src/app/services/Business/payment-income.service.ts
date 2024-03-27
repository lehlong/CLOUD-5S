import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PaymentIncomeDetailFilter, PaymentIncomeIndexSearchFilter} from '../../@filter/SO/paymentIncome.filter';
@Injectable({
  providedIn: 'root',
})
export class PaymentIncomeService {
  constructor(private _commonService: CommonService) {}

  search(filter?: PaymentIncomeIndexSearchFilter) {
    return this._commonService.getRequest(`OrderExport/GetDebtCloseExport`, filter);
  }

  getDetail(parameters?: PaymentIncomeDetailFilter) {
    console.log(parameters);
    return this._commonService.getRequest(`OrderExport/DebtCloseExportDetail`, parameters);
  }

  ExportExcel(pagination?: PaymentIncomeIndexSearchFilter) {
    return this._commonService.getFileRequest(`OrderExport/DebtCloseExportExcel`, pagination);
  }
}
