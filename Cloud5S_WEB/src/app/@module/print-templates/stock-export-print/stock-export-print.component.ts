import { Component } from '@angular/core';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-stock-export-print',
  templateUrl: './stock-export-print.component.html',
  styleUrls: ['./stock-export-print.component.scss']
})
export class StockExportPrintComponent {
  constructor( public utils: utils){
    
  }
  data: any = null;
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
