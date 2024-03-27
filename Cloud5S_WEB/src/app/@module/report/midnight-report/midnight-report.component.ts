import {Component} from '@angular/core';
import {MidnightReportService} from 'src/app/services/Report/midnight-report.service';
import {MidnightReportFilter} from 'src/app/@filter/Report/midnight-report.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
import {REPORT_0H} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-midnight-report',
  templateUrl: './midnight-report.component.html',
  styleUrls: ['./midnight-report.component.scss'],
})
export class MidnightReportComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };

  displayedColumns: string[] = [];
  dataTable: any = [];
  filter = new MidnightReportFilter();
  dynamicColums: any = [];
  REPORT_0H = REPORT_0H;

  constructor(
    private _service: MidnightReportService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo 0h',
        path: 'report/midnight-report',
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

  getTotal(key:string, index: number | null = null) {
    return this.utils.formatNumber(
      this.dataTable.reduce((total: number, element: any) => {
        const value = index !== null ? (element?.partnerReceipts?.[index]?.partnerNumber || 0) : (element[key] || 0);
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
        ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      })
      .subscribe((result: Blob) => {
        const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.download = 'bao-cao-0h.xlsx';
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

  search() {
    setTimeout(() => {
      if(this.filter?.selectedRange?.length !== 2) return
      const filterFormat = {
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : null,
        ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : null,
      };
      this._service.export0H(filterFormat).subscribe({
        next: ({data}) => {
          this.dynamicColums = data?.dataInMonth?.reduce((result: any, item: any) => {
            if (item?.partnerReceipts?.length > result?.length) {
              return [...item?.partnerReceipts];
            }
            return result;
          }, []);
          if(this.dynamicColums?.length === 0) {
            this.dynamicColums = [{
              partnerCode: 'empty',
              partnerName: '',
              partnerNumber: null
            }]
          }
          this.displayedColumns = [
            'orderDate',
            ...this.dynamicColums.map((element: any) => element?.partnerCode),
            'totalPartnerNumber',
            'shift1Value',
            'shift2Value',
            'shift3Value',
            'totalShiftGMT',
            'totalShiftBDT',
            'stockGMT',
            'stockBDT',
          ];
  
          this.dataTable = [
            {
              title: 'Tồn đầu kỳ',
              partnerReceipts: null,
              shift1Value: null,
              shift2Value: null,
              shift3Value: null,
              stockBDT: data?.beginBDT,
              stockGMT: data?.beginGMT,
              totalPartnerNumber: null,
              totalShiftBDT: null,
              totalShiftGMT: null,
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
    }, 100)
  }

  loadInit() {
    this.search();
  }

  reload() {
    this.filter = new MidnightReportFilter();
    this.search();
  }
}
