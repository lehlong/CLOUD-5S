import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-export-print',
  templateUrl: './export-print.component.html',
  styleUrls: ['./export-print.component.scss'],
})
export class ExportPrintComponent implements OnInit {
  ngOnInit(): void {
    this.dayExportData = this.data.dayExportData;
    console.log(this.dayExportData);
    this.selectedRange = this.data.selectedRange;
  }
  getDateRange() {
    if (this.selectedRange.length === 0) return '';
    else if (this.selectedRange[0].getTime() === this.selectedRange[1].getTime())
      return moment(this.selectedRange[0]).format('DD/MM/YYYY');
    return (
      moment(this.selectedRange[0]).format('DD/MM/YYYY') +
      '     -    ' +
      moment(this.selectedRange[1]).format('DD/MM/YYYY')
    );
  }
  data: any;
  selectedRange: Date[] = [];
  dayExportData: any;
  displayedColumns = [
    'date',
    'time',
    'ordinalNumber',
    'pmNumber',
    'customerName',
    'createBy',
    'vehicleCode',
    'driverName',
    'orderNumber',
    'slump',
    'unit',
    'm100R28',
    'm100R28_CDC',
    'm150R7',
    'm200R7',
    'quantity',
    'price',
    'totalPrice',
    'taxVat',
    'discount',
    'taxedTotalPrice',
    'debt',
    'orderType',
    'area',
    'pumpVehicle',
  ];
}
