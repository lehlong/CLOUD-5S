import {Component} from '@angular/core';
import {OrderImportService} from 'src/app/services/Business/order-import-service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderImportCreateComponent} from '../order-import-create/order-import-create.component';
import {OrderImportEditComponent} from '../order-import-edit/order-import-edit.component';
import {OrderImportDetailComponent} from '../order-import-detail/order-import-detail.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {OrderImportModel} from 'src/app/models/Business/order-import.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {STATE_STOCK} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-order-import-index',
  templateUrl: './order-import-index.component.html',
  styleUrls: ['./order-import-index.component.scss'],
})
export class OrderImportIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  displayedColumns: string[] = [
    'index',
    'code',
    'importDate',
    'partner',
    'stockImport',
    'sumMoney',
    'createBy',
    'createDate',
    'state',
  ];
  paginationResult!: PaginationResult;
  filter = new StockImportFilter();
  STATE_STOCK = STATE_STOCK;
  faFileExcel = faFileExcel;
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;

  listStockAll: any = [];
  listPartnerAll: any = [];

  constructor(
    private _service: OrderImportService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'content.business.order_import.list.breadcrumb',
        path: 'business/order-import',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
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

  exportExcel() {
    return this._service
      .ExportExcel({
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
        PartnerCode: this.filter.PartnerCode,
        StockCode: this.filter.StockCode,
      })
      .subscribe((result: Blob) => {
        const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.download = 'danh-sach-quan-ly-nhap-hang.xlsx';
        anchor.href = url;
        anchor.click();
      });
  }

  openCreate() {
    this.drawerService.open(OrderImportCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(OrderImportIndexComponent)) {
        if (result?.create) {
          this.openDetail(result?.data?.code);
        }
        this.loadInit();
      }
    });
  }

  openDetail(code: string = '') {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: code,
      },
    });
    this.drawerService
      .open(OrderImportDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(OrderImportIndexComponent)) {
          this.loadInit();
        }
      });
  }

  openEdit(code: string) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: code,
      },
    });
    this.drawerService
      .open(OrderImportEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        console.log('result', result);
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(OrderImportIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    this._service
      .search(
        {
          currentPage: this.filter.currentPage,
          pageSize: this.filter.pageSize,
          keyWord: this.filter.keyWord,
          FromDate:
            this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
          ToDate:
            this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
          PartnerCode: this.filter.PartnerCode,
          StockCode: this.filter.StockCode,
        }
      )
      .subscribe({
        next: ({data}) => {
          this.paginationResult = {
            ...data,
            data: data.data.map((item: OrderImportModel) => {
              return {
                code: item.code,
                importDate: item?.importDate,
                partnerName: item?.partner?.name,
                sumMoney: item?.sumMoney,
                state: item?.state,
                createDate: item?.createDate,
                createBy: item?.createBy,
                stockName: item?.stock?.name,
              };
            }),
          };
          this.router.navigate([], {
            replaceUrl: true,
            relativeTo: this.route,
            queryParams: this.filter,
          });
          if (this.filter.code !== '') {
            const detail = data?.data?.find((item: OrderImportModel) => item.code == this.filter.code);
            if (detail && first) {
              this.openDetail(detail?.code);
            }
          }
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  loadInit(first: boolean = false) {
    this.GetAllStock();
    this.GetAllPartner();
    this.search(first);
  }

  reload() {
    this.filter = new StockImportFilter();
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
