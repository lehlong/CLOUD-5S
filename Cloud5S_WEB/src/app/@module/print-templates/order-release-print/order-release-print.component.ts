import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-release-print',
  templateUrl: './order-release-print.component.html',
  styleUrls: ['./order-release-print.component.scss'],
})
export class OrderReleasePrintComponent implements OnInit {
  data: any = null;
  orderDetail: any = null;
  itemMain: any = null;
  itemFormula: any = null;
  ngOnInit(): void {
    this.orderDetail = this.data.orderDetail;
    this.itemMain = this.orderDetail.orderDetails.find((i: any) => i.isMainItem);
    this.itemFormula = this.itemMain?.item?.itemFormula;
    console.log(this.orderDetail, 'detail');
  }

  getTotalMoney() {
    if (this.orderDetail?.orderDetails?.length == 0) {
      return 0;
    }
    const sumMoneys = this.orderDetail?.orderDetails.map((o: any) => o.sumMoney);
    return sumMoneys.reduce((total: number, currentValue: any) => {
      if (!currentValue) {
        currentValue = 0;
      }
      return total + currentValue;
    });
  }
}
