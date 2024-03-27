import {Component} from '@angular/core';
import {utils} from 'src/app/utils/utils';
import {METHOD_NAME} from 'src/app/utils/constant/payment-method';
@Component({
  selector: 'app-payment-income-print',
  templateUrl: './payment-income-print.component.html',
})
export class PaymentIncomePrintComponent {
  data: any = null;
  METHOD_NAME: any = METHOD_NAME;
  constructor(public utils: utils) {}
  ngOnInit() {}
}
