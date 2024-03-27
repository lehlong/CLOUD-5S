import {Component} from '@angular/core';
import {MidnightReportService} from 'src/app/services/Report/midnight-report.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {MidnightReportFilter} from 'src/app/@filter/Report/midnight-report.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-report-import-total-index',
  templateUrl: './report-import-total-index.component.html',
  styleUrls: ['./report-import-total-index.component.scss'],
})
export class ReportImportTotalIndexComponent {
  maxTagCount = 1;
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };

  listPartnerAll: any = [];
  listPayTypeAll: any = [];
  listArea: any = [];

  displayedColumns: string[] = [
    'index',
    'vinafor',
    'qnfFm',
    'vjc',
    'total',
    'shift1',
    'shift2',
    'shift3',
    'gmt1',
    'bdt1',
  ];
  paginationResult!: PaginationResult;
  filter = new MidnightReportFilter();

  data: any = [];

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
    this.data = this.generateFakeData();
  }

  generateFakeData() {
    return [
      {
        stt: 1,
        date: 1 / 9 / 2023,
        rate1: 100,
        rate2: 50,
        data1: 100,
        data2: 100,
        data3: 100,
        data4: 100,
        rate3: 100,
        rate4: 50,
        rate5: 100,
        rate6: 50,
        rate7: 100,
        rate8: 50,
        rate9: 100,
        rate10: 50,
        rate11: 50,
        rate12: 100,
        rate13: 50,
      },
      {
        stt: 2,
        date: 2 / 9 / 2023,
        rate1: 200,
        rate2: 75,
        data1: 100,
        data2: 100,
        data3: 100,
        data4: 100,
        rate3: 100,
        rate4: 50,
        rate5: 100,
        rate6: 50,
        rate7: 100,
        rate8: 50,
        rate9: 100,
        rate10: 50,
        rate11: 50,
        rate12: 100,
        rate13: 50,
      },
      {
        stt: 3,
        date: 3 / 9 / 2023,
        rate1: 200,
        rate2: 75,
        data1: 100,
        data2: 100,
        data3: 100,
        data4: 100,
        rate3: 100,
        rate4: 50,
        rate5: 100,
        rate6: 50,
        rate7: 100,
        rate8: 50,
        rate9: 100,
        rate10: 50,
        rate11: 50,
        rate12: 100,
        rate13: 50,
      },
      {
        stt: 4,
        date: 4 / 9 / 2023,
        rate1: 200,
        rate2: 75,
        data1: 100,
        data2: 100,
        data3: 100,
        data4: 100,
        rate3: 100,
        rate4: 50,
        rate5: 100,
        rate6: 50,
        rate7: 100,
        rate8: 50,
        rate9: 100,
        rate10: 50,
        rate11: 50,
        rate12: 100,
        rate13: 50,
      },
    ];
  }
  calculateColumnTotal(columnName: string): number {
    return this.data.reduce((total: any, row: any) => total + (row[columnName] || 0), 0);
  }
  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listArea = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllPayType() {
    this.dropdownService.GetAllPayType().subscribe(
      ({data}) => {
        this.listPayTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  search() {
    this.paginationResult = {
      currentPage: 0,
      totalPage: 1,
      pageSize: 10,
      keyWord: '',
      totalRecord: 1,
      data: [
        {
          index: 0,
          vinafor1: 100,
          vinafor2: 200,
          qnfFm: 17.79,
          vjc: 237.64,
          total: 402.9,
          shift1: 83.95,
          shift2: 165.91,
          shift3: 220.02,
          gmt1: 469.88,
          bdt1: 209.1,
          gmt2: 29043.83,
          bdt2: 2596.09,
          bdt3: 111,
        },
        {
          index: 1,
          vinafor: 147.47,
          qnfFm: 17.79,
          vjc: 237.64,
          total: 402.9,
          shift1: 83.95,
          shift2: 165.91,
          shift3: 220.02,
          gmt1: 469.88,
          bdt1: 209.1,
          gmt2: 29043.83,
          bdt2: 2596.09,
        },
      ],
    };
    return;
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    // this._service.search(filterFormat).subscribe({
    //   next: ({data}) => {
    //     this.paginationResult = data;
    //     this.router.navigate([], {
    //       replaceUrl: true,
    //       relativeTo: this.route,
    //       queryParams: this.filter,
    //     });
    //   },
    //   error: (response) => {
    //     console.log(response);
    //   },
    // });
  }

  loadInit() {
    this.GetAllPartner();
    this.GetAllPayType();
    this.GetArea();
    this.search();
  }

  reload() {
    this.filter = new MidnightReportFilter();
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.currentPage = 1;
    this.filter.pageSize = pageSize;
    this.search();
  }
}
