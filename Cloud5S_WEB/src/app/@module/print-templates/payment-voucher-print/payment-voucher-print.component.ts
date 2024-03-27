import {Component} from '@angular/core';
import {utils} from 'src/app/utils/utils';
import {METHOD_NAME} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-payment-voucher-print',
  templateUrl: './payment-voucher-print.component.html',
})
export class PaymentVoucherPrintComponent {
  data: any = null;
  METHOD_NAME: any = METHOD_NAME;
  constructor(public utils: utils) {}
  ngOnInit() {}
}
