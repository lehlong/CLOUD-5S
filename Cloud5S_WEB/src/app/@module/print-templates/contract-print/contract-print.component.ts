import {Component} from '@angular/core';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-contract-print',
  templateUrl: './contract-print.component.html',
})
export class ContractPrintComponent {
  data: any = null;
  constructor(public utils: utils) {}
  ngOnInit() {
    console.log('data', this.data);
  }
  formatNumber(value: number) {
    return this.utils.formatNumber(value);
  }
  getTotalMoney(detailData: any) {
    if (!detailData || !detailData.details || !Array.isArray(detailData.details)) {
      return 0;
    }
    const totalImportValue = detailData.details.reduce((accumulator: any, currentProduct: any) => {
      const orderNumber = currentProduct?.orderNumber || 0;
      const price = currentProduct?.price || 0;
      return accumulator + orderNumber * price;
    }, 0);

    return this.utils.formatNumber(totalImportValue);
  }
}
