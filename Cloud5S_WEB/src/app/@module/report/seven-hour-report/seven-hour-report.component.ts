import {Component} from '@angular/core';
import {ReportSevenHourService} from 'src/app/services/Report/report-seven-hour.service';
import {MidnightReportFilter} from 'src/app/@filter/Report/midnight-report.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
import {REPORT_7H} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-seven-hour-report',
  templateUrl: './seven-hour-report.component.html',
  styleUrls: ['./seven-hour-report.component.scss'],
})
export class SevenHourReportComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };

  dataTable: any = [];
  REPORT_7H = REPORT_7H;

  displayedColumnsHeader: string[] = [];

  displayedColumns: string[] = [];

  dynamicColums: any = [];

  filter = new MidnightReportFilter();

  constructor(
    private _service: ReportSevenHourService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo 7h',
        path: 'report/seven-hour-report',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  ngOnInit(): void {
    this.loadInit();
  }

  search() {
    setTimeout(() => {
      if (this.filter?.selectedRange?.length !== 2) return;
      const filterFormat = {
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : null,
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : null,
      };
      this._service.export7H(filterFormat).subscribe({
        next: ({data}) => {
          this.dynamicColums = data?.dataInMonth?.reduce((result: any, item: any) => {
            if (item?.partnerNumber?.length > result?.length) {
              return [...item?.partnerNumber];
            }
            return result;
          }, []);

          if (!this.dynamicColums || this.dynamicColums?.length === 0) {
            this.dynamicColums = [
              {
                partnerCode: 'empty',
                partnerName: '',
                shift1Number: null,
                shift2Number: null,
                shift3Number: null,
                totalNumber: null,
              },
            ];
          }
          this.displayedColumns = [
            'orderDate',
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_1`),
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_2`),
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_3`),
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_4`),
            'totalPartnerNumber',
            'consumptionShift1Number',
            'consumptionShift2Number',
            'consumptionShift3Number',
            'consumptionTotalShiftNumber',
            'dischargeShift1Number',
            'dischargeShift2Number',
            'dischargeShift3Number',
            'dischargeTotalNumber',
            'inventoryLog',
            'inventoryBDT',
          ];

          this.displayedColumnsHeader = [
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_1`),
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_2`),
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_3`),
            ...this.dynamicColums.map((element: any) => `${element?.partnerCode}_4`),
            'consumptionShift1Number',
            'consumptionShift2Number',
            'consumptionShift3Number',
            'consumptionTotalShiftNumber',
            'dischargeShift1Number',
            'dischargeShift2Number',
            'dischargeShift3Number',
            'dischargeTotalNumber',
            'inventoryLog',
            'inventoryBDT',
          ];

          this.dataTable = [
            {
              title: '',
              consumptionShift1Number: null,
              consumptionShift2Number: null,
              consumptionShift3Number: null,
              consumptionTotalShiftNumber: null,
              dischargeShift1Number: null,
              dischargeShift2Number: null,
              dischargeShift3Number: null,
              dischargeTotalNumber: null,
              inventoryBDT: data?.beginBDT,
              inventoryLog: data?.beginGMT,
              partnerNumber: null,
              totalPartnerNumber: null,
            },
            ...data?.dataInMonth,
          ];
          this.router.navigate([], {
            replaceUrl: true,
            relativeTo: this.route,
            queryParams: this.filter,
          });
        },
        error: (response) => {
          console.log(response);
        },
      });
    }, 100);
  }

  loadInit() {
    this.search();
  }

  reload() {
    this.filter = new MidnightReportFilter();
    this.search();
  }

  getTotal(key: string, index: number | null = null) {
    return this.utils.formatNumber(
      this.dataTable.reduce((total: number, element: any) => {
        const value = index !== null ? element?.partnerNumber?.[index]?.[key] || 0 : element[key] || 0;
        return total + value;
      }, 0),
    );
  }

  exportExcel() {
    return this._service
      .downloadExport({
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      })
      .subscribe((result: Blob) => {
        const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.download = 'bao-cao-7h.xlsx';
        anchor.href = url;
        anchor.click();
      });
  }
  makeNewStockItemDetail(){
    const FromDate = this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '';
     return this._service.makeNewStockItemDetail({FromDate}).subscribe({
      next: ({data}) => {
        this.search();   
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
