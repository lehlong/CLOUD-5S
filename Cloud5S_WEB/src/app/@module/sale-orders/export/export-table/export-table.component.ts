import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ExportTableFilter} from 'src/app/@filter/SO/export-table.filter';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {utils} from 'src/app/utils/utils';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import * as moment from 'moment';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PrintService} from 'src/app/services/Common/print.service';
import {ExportPrintComponent} from 'src/app/@module/print-templates/export-print/export-print.component';

@Component({
  selector: 'app-export-table',
  templateUrl: './export-table.component.html',
  styleUrls: ['./export-table.component.scss'],
})
export class ExportTableComponent implements OnInit {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
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
  columnsSum = {
    date: 'Tổng',
    m100R28: 0,
    m100R28_CDC: 0,
    m150R7: 0,
    m200R7: 0,
    quantity: 0,
    totalPrice: 0,
    discount: 0,
    debt: 0,
    taxedTotalPrice: 0,
  };
  filter = new ExportTableFilter();
  dayExportData: any;
  faFileExcel = faFileExcel;
  constructor(
    public dialogRef: MatDialogRef<ExportTableComponent>,
    public utils: utils,
    private viewContainerRef: ViewContainerRef,
    private printService: PrintService,
    private _service: OrderExportService,
    private orderExportService: OrderExportService,
  ) {}
  ngOnInit(): void {
    this.search();
  }
  reCalculateSum(data: any) {
    this.columnsSum = {
      date: 'Tổng',
      m100R28: 0,
      m100R28_CDC: 0,
      m150R7: 0,
      m200R7: 0,
      quantity: 0,
      totalPrice: 0,
      discount: 0,
      debt: 0,
      taxedTotalPrice: 0,
    };
    this.columnsSum = data.reduce((total: any, current: any) => {
      total.m100R28 += current?.m100R28 || 0;
      total.m100R28_CDC += current?.m100R28_CDC || 0;
      total.m150R7 += current?.m150R7 || 0;
      total.m200R7 += current?.m200R7 || 0;
      total.quantity += current?.quantity || 0;
      total.totalPrice += current?.totalPrice || 0;
      total.discount += current?.discount || 0;
      total.debt += current?.debt || 0;
      total.taxedTotalPrice += current?.taxedTotalPrice || 0;
      return total;
    }, this.columnsSum);
  }
  search() {
    this.orderExportService
      .GetExportByDay({
        // currentPage: this.filter.currentPage,
        // pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      } as ExportTableFilter)
      .subscribe({
        next: ({data}) => {
          console.log(data);

          this.dayExportData = data;
          this.reCalculateSum(data.data);
          if (data.data.length > 0) {
            this.dayExportData.data.push(this.columnsSum);
          }
          console.log(this.dayExportData);
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  printWarehouseReceipt() {
    console.log(this.dayExportData);

    this.printService.printComponent(
      {dayExportData: this.dayExportData, selectedRange: this.filter.selectedRange},
      ExportPrintComponent,
      this.viewContainerRef,
      'export.css',
    );
  }

  exportExcel() {
    const filterFormat = {
      ...this.filter,
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      PartnerCode: this.filter.PartnerCode,
    };
    return this._service.ExportByDayExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-ban-ke-ban-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  pageSizeChange(pageSize: number) {
    this.filter.currentPage = 1;
    this.filter.pageSize = pageSize;
    this.search();
  }
  reload() {
    this.filter = new ExportTableFilter();
    this.search();
  }
}
