import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaymentPayService} from 'src/app/services/Business/payment-pay.service';

import {PaymentPayDetailFilter} from 'src/app/@filter/Business/payment-pay.filter';

@Component({
  selector: 'app-payment-pay-detail',
  templateUrl: './payment-pay-detail.component.html',
  styleUrls: ['./payment-pay-detail.component.scss'],
})
export class PaymentPayDetailComponent {
  constructor(
    private drawerService: DrawerService,

    private _service: PaymentPayService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.screenWidth = `${window.innerWidth * 0.7}px`;
  }
  screenWidth: string;

  data: any;
  detail: any = {details: []};
  loadInit() {
    // this.GetDetail();
  }

  ngOnInit(): void {
    // this.loadInit();
    console.log(this.data);
    this._service
      .getDetail({
        ...new PaymentPayDetailFilter(),
        PartnerCode: this.data.partnerCode,
        FromDate: this.data.FromDate,
        ToDate: this.data.ToDate,
      })
      .subscribe((response) => {
        this.detail = response.data.data;
        console.log(this.detail);
      });
  }
  close() {
    this.drawerService.close();
  }
}
