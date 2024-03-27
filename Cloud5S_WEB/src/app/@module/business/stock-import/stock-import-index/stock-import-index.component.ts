import {Component} from '@angular/core';
import {StockImportService} from 'src/app/services/Business/stock-import.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {StockImportCreateComponent} from '../stock-import-create/stock-import-create.component';
import {StockImportEditComponent} from '../stock-import-edit/stock-import-edit.component';
import {StockImportDetailComponent} from '../stock-import-detail/stock-import-detail.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {StockImportModel} from 'src/app/models/Business/stock.model';
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
  selector: 'app-stock-import-index',
  templateUrl: './stock-import-index.component.html',
  styleUrls: ['./stock-import-index.component.scss'],
})
export class StockImportIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  displayedColumns: string[] = ['index', 'code', 'importDate', 'stockImport', 'createBy', 'createDate', 'state'];
  paginationResult!: PaginationResult;
  filter = new StockImportFilter();
  STATE_STOCK = STATE_STOCK;
  faFileExcel = faFileExcel;
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;

  listStockAll: any = [];
  listPartnerAll: any = [];

  constructor(
    private _service: StockImportService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Phiếu nhập kho',
        path: 'business/stock-import',
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
        anchor.download = 'phieu-nhap-kho.xlsx';
        anchor.href = url;
        anchor.click();
      });
  }

  openCreate() {
    this.drawerService.open(StockImportCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(StockImportIndexComponent)) {
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
      .open(StockImportDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(StockImportIndexComponent)) {
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
      .open(StockImportEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        console.log('result', result);
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(StockImportIndexComponent)) {
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
            data: data.data.map((item: StockImportModel) => {
              return {
                code: item.code,
                importDate: item?.importDate,
                itemName: item?.importDetails?.map((detail: any) => detail?.item?.name || ''),
                amount: item?.importDetails?.map((detail: any) => detail?.amount || 0),
                unitName: item?.importDetails?.map((detail: any) => detail?.item?.unit?.name || ''),
                state: item?.state,
                createDate: item?.createDate,
                createBy: item?.createBy,
                partnerName: item?.partner?.name,
                stockName: item?.stock?.name,
                creator: item?.creator,
              };
            }),
          };
          this.router.navigate([], {
            replaceUrl: true,
            relativeTo: this.route,
            queryParams: this.filter,
          });
          if (this.filter.code !== '') {
            const detail = data?.data?.find((item: StockImportModel) => item.code == this.filter.code);
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
