import {Component} from '@angular/core';
import {ReportImportExportService} from 'src/app/services/Report/report-import-export.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ReportImportExportFilter} from 'src/app/@filter/Report/report-import-export.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import {REPORTIMPORTEXPORT_RIGHTS} from 'src/app/utils/constant/index';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-report-import-export-index',
  templateUrl: './report-import-export-index.component.html',
  styleUrls: ['./report-import-export-index.component.scss'],
})
export class ReportImportExportIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  listPartnerAll: any = [];
  listItemAll: any = [];
  faFileExcel = faFileExcel;

  listItemTypeAll: any = [];

  listStockAll: any = [];

  listPartnerFilter: any = [];

  selectedStates: any = [];
  REPORTIMPORTEXPORT_RIGHTS = REPORTIMPORTEXPORT_RIGHTS;

  displayedColumns: string[] = [
    'index',
    'stockName',
    'itemCode',
    'itemName',
    'firstAmount',
    'importAmount',
    'exportAmount',
    'lastAmount',
  ];
  paginationResult!: PaginationResult;

  filter = new ReportImportExportFilter();
  state_order = STATE_ORDER;
  list_state = LIST_STATE;

  constructor(
    private _service: ReportImportExportService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo chi tiết nhập xuất tồn',
        path: 'report/report-import-export',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
      if (params?.States !== '') {
        this.selectedStates = this.list_state.filter((item: any) => {
          return params?.States?.includes(item.value);
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStockAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllItemType() {
    this.dropdownService.GetAllItemType().subscribe(
      ({data}) => {
        this.listItemTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      itemCode: this.filter.itemCode,
      PartnerCode: this.filter.PartnerCode,
      itemType: this.filter.itemType,
      StockCode: this.filter.StockCode,
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-phieu-xuat-nhap-ton.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      itemCode: this.filter.itemCode,
      PartnerCode: this.filter.PartnerCode,
      itemType: this.filter.itemType,
      StockCode: this.filter.StockCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: ReportImportExportFilter) => item.code == this.filter.code);
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetAllItem();
    this.GetAllStock();
    this.search(first);

    this.GetAllItemType();
  }

  reload() {
    this.selectedStates = [];

    this.filter = new ReportImportExportFilter();
    this.search(true);
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
