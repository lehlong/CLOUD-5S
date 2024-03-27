import {GlobalService} from 'src/app/services/Common/global.service';
import {orderDetails} from './../../../../models/SO/order.model';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {LIST_STATE, STATE_ORDER} from 'src/app/utils/constant';
import {OrderModel} from 'src/app/models/SO/order.model';
import {utils} from 'src/app/utils/utils';
import {MatDialog} from '@angular/material/dialog';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import {OrderExportFilter} from 'src/app/@filter/SO/export.filter';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {EXPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import * as moment from 'moment';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {ExportCreateComponent} from '../export-create/export-create.component';
import {LIST_ORDER_EXPORT, LIST_TYPE, ORDER_EXPORT_TYPE} from 'src/app/utils/constant/order-export';
import {ExportEditComponent} from '../export-edit/export-edit.component';
import {ExportDetailComponent} from '../export-detail/export-detail.component';
import {ChooseExportIncomeComponent} from '../../../business/income/choose-export/choose-export.component';
import {ExportTableComponent} from '../export-table/export-table.component';
@Component({
  selector: 'app-export-index',
  templateUrl: './export-index.component.html',
  styleUrls: ['./export-index.component.scss'],
})
export class ExportIndexComponent {
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
  listPartnerFilter: any = [];
  listItemFilter: any = [];
  widthDeault: string = '0px';

  selectedStates: any = [];

  displayedColumns: string[] = [
    'index',
    'type',
    'code',
    'orderCode',
    'exportDate',
    'partnerName',
    'itemName',
    'orderNumber',
    'sumMoney',
    'state',
  ];
  paginationResult!: PaginationResult;
  state_order = STATE_ORDER;
  list_state = LIST_STATE;
  EXPORT_RIGHTS = EXPORT_RIGHTS;
  STATE_ORDER_EXPORT = LIST_ORDER_EXPORT;
  filter = new OrderExportFilter();
  ORDER_EXPORT_TYPE = ORDER_EXPORT_TYPE;
  listType = LIST_TYPE;

  partnerSelected = {
    code: '',
    name: '',
  };

  selectedValue = null;

  constructor(
    private _service: OrderExportService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    public dialog: MatDialog,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
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

  onChangePartner(event: any) {
    this.listPartnerFilter = this.listPartnerAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  onChangeItem(event: any) {
    this.listItemFilter = this.listItemAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  selectPartner(item: any, event: any) {
    if (event.isUserInput) {
      this.partnerSelected.code = item.code;
      this.partnerSelected.name = item.name;
    }
  }

  openChooseItem() {
    const dialogRef = this.dialog.open(ExportTableComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
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

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
        this.listItemFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  openEdit(item: any) {
    this.drawerService
      .open(ExportEditComponent, {
        itemDetail: item,
      })
      .subscribe((result) => {
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(ExportIndexComponent)) {
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
        orderExport: code,
      },
    });
    this.drawerService
      .open(ExportDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.item);
        } else if (result?.status && this.utils.checkComponent(ExportIndexComponent)) {
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
      type: this.selectedValue,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
        };
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        // if (this.filter.orderExport !== '') {
        //   const detail = data?.data?.find((item: OrderFilter) => item.code == this.filter.orderExport);
        //   if (detail && first) {
        //     console.log('aaaaaaaaaa');
        //     this.openDetail(detail.code);
        //   }
        // }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetAllItem();
    this.search(first);
  }

  reload() {
    this.selectedStates = [];
    this.selectedValue = null;
    this.filter = new OrderExportFilter();
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

  getOrderNumber(order: any) {
    const itemMain = order.orderDetails.find((o: any) => o.isMainItem);
    return itemMain.orderNumber;
  }

  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      PartnerCode: this.filter.PartnerCode,
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-quan-ly-ban-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(ExportCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ExportIndexComponent)) {
        if (result?.create) {
          this.openDetail(result?.data?.code);
        }
        this.loadInit();
      }
    });
  }
}
