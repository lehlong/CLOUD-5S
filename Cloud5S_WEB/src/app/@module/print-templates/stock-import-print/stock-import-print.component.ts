import {Component} from '@angular/core';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-stock-import-print',
  templateUrl: './stock-import-print.component.html',
})
export class StockImportPrintComponent {
  data: any = null;
  constructor(public utils: utils) {}
  ngOnInit() {}
  formatNumber(value: number) {
    return this.utils.formatNumber(value);
  }
  getTotalMoney(detailData: any) {
    if (!detailData || !detailData.importDetails || !Array.isArray(detailData.importDetails)) {
      return 0;
    }
    const totalImportValue = detailData.importDetails.reduce((accumulator: any, currentProduct: any) => {
      const amount = currentProduct?.amount || 0;
      const price = currentProduct?.price || 0;
      return accumulator + amount * price;
    }, 0);

    return this.utils.formatNumber(totalImportValue);
  }
}
