import {Component} from '@angular/core';

@Component({
  selector: 'app-order-export-print',
  templateUrl: './order-export-print.component.html',
  styleUrls: ['./order-export-print.component.scss'],
})
export class OrderExportPrintComponent {
  data: any = null;
  orderDetail: any;
  itemDetail: any = null;
  itemMain: any = null;
  itemFormula: any = null;
  ngOnInit(): void {}
}
