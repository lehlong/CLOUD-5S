import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PaymentVoucherFilterRequest, PaymentVoucherFilterDetail} from 'src/app/@filter/Business/payment-voucher.filter';
import {PaymentVoucherModel} from 'src/app/models/Business/payment-voucher.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentVoucherService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: PaymentVoucherFilterRequest) {
    return this._commonService.getRequest(`PayBill/Search`, pagination);
  }

  GetDetail(pagination?: PaymentVoucherFilterDetail) {
    return this._commonService.getRequest(`PayBill/GetDetail`, pagination);
  }

  Insert(parameters?: PaymentVoucherModel) {
    return this._commonService.postRequest(`PayBill/Insert`, parameters);
  }

  Update(parameters?: PaymentVoucherModel) {
    return this._commonService.putRequest(`PayBill/Update`, parameters);
  }

  CancelState(parameters?: any) {
    return this._commonService.putRequest(`PayBill/CancelState`, parameters);
  }

  ConfirmState(parameters?: any) {
    return this._commonService.putRequest(`PayBill/ConfirmState`, parameters);
  }
}
