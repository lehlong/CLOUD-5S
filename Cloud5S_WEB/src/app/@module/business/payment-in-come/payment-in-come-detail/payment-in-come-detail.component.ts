import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaymentIncomeService} from 'src/app/services/Business/payment-income.service';
import {OrderScalePrintComponent} from 'src/app/@module/print-templates/order-scale-print/order-scale-print/order-scale-print.component';
import {orderScaleDetails} from 'src/app/models/MD/orders-cale.model';
import {CompanyService} from 'src/app/services/Common/company.service';
import {PaymentIncomeDetailFilter} from 'src/app/@filter/SO/paymentIncome.filter';
@Component({
  selector: 'app-payment-in-come-detail',
  templateUrl: './payment-in-come-detail.component.html',
  styleUrls: ['./payment-in-come-detail.component.scss'],
})
export class PaymentIncomeDetailComponent implements OnInit {
  constructor(
    private drawerService: DrawerService,

    private _service: PaymentIncomeService,
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
        ...new PaymentIncomeDetailFilter(),
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
