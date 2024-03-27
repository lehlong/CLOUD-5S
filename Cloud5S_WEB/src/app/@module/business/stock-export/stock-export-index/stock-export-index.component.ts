import {Component} from '@angular/core';
import {StockExportService} from 'src/app/services/Business/stock-export.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {StockExportEditComponent} from '../stock-export-edit/stock-export-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {StockExportFilter} from 'src/app/@filter/Business/stock-export.filter';
import {StockExportModel} from 'src/app/models/Business/stock.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {formatNumber} from '../../../../utils/func-feature';
import {STATE_STOCK} from 'src/app/utils/constant/index';
import {STOCK_EXPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';

import {DropdownService} from 'src/app/services/Common/dropdown.service';
@Component({
  selector: 'app-stock-export-index',
  templateUrl: './stock-export-index.component.html',
  styleUrls: ['./stock-export-index.component.scss'],
})
export class StockExportIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  displayedColumns: string[] = ['index', 'code', 'importDate', 'orderCode', 'itemName', 'amount', 'unitName', 'state'];
  paginationResult!: PaginationResult;
  filter = new StockExportFilter();

  listStockAll: any = [];
  listStockFilter: any = [];
  listPartnerAll: any = [];
  listPartnerFilter: any = [];

  StockSelected = {
    code: '',
    name: '',
  };
  PartnerSelected = {
    code: '',
    name: '',
  };
  STATE_STOCK = STATE_STOCK;
  formatNumber = formatNumber;
  faFileExcel = faFileExcel;
  STOCK_EXPORT_RIGHTS = STOCK_EXPORT_RIGHTS;
  constructor(
    private _service: StockExportService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
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

  onChangeStock(event: any) {
    this.listStockFilter = this.listStockAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }
  selectStock(item: any, event: any) {
    if (event.isUserInput) {
      this.StockSelected.code = item.code;
      this.StockSelected.name = item.name;
    }
    this.filter.StockCode = item.code;
    console.log('StockSelected', this.StockSelected);
  }
  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStockAll = data;
        this.listStockFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onChangePartner(event: any) {
    this.listPartnerFilter = this.listPartnerAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }
  selectPartner(item: any, event: any) {
    if (event.isUserInput) {
      this.PartnerSelected.code = item.code;
      this.PartnerSelected.name = item.name;
    }
    this.filter.PartnerCode = item.code;
  }
  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
        this.listPartnerFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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
      .open(StockExportEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(StockExportIndexComponent)) {
          this.loadInit();
        }
      });
  }
  openEdit(item: any) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
      },
    });
    this.drawerService
      .open(StockExportEditComponent, {
        code: item.code,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(StockExportIndexComponent)) {
          this.loadInit();
        }
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
      PartnerCode: this.filter.PartnerCode,
      StockCode: this.filter.StockCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data.data.map((item: StockExportModel) => {
            return {
              code: item.code,
              exportDate: item?.exportDate,
              state: item.state,
              itemName: item?.exportDetails?.map((detail: any) => detail?.item?.name || ''),
              amount: item?.exportDetails?.map((detail: any) => detail?.amount || 0),
              unitName: item?.exportDetails?.map((detail: any) => detail?.item?.unit?.name || ''),
              itemCode: item?.exportDetails?.map((detail: any) => detail?.item?.code || ''),
            };
          }),
        };
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: StockExportModel) => item.code == this.filter.code);
          if (detail && first) {
            this.openEdit(detail);
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
    this.PartnerSelected = {
      code: '',
      name: '',
    };
    this.StockSelected = {
      code: '',
      name: '',
    };
    this.filter = new StockExportFilter();
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
  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'phieu-xuat-kho.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}
