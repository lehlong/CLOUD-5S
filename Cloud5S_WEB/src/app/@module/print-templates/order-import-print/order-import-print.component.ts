import { Component } from '@angular/core';

@Component({
  selector: 'app-order-import-print',
  templateUrl: './order-import-print.component.html',
  styleUrls: ['./order-import-print.component.scss']
})
export class OrderImportPrintComponent {
  data: any = null;
  detailData: any = null;
  ngOnInit(): void {
    this.detailData = this.data?.detail ;
    console.log('dcm mmmanhchuc',this.data);
  }
  getTotalMoney() {
    if (this.detailData?.importDetails?.length == 0) {
      return 0;
    }
    const sumMoneys = this.detailData?.importDetails.map((o: any) => o.sumMoney);
    return sumMoneys.reduce((total: number, currentValue: any) => {
      if (!currentValue) {
        currentValue = 0;
      }
      return total + currentValue;
    });
  }
}
