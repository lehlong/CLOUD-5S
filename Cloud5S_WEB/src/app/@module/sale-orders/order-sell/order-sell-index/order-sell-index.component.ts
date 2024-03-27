import {Component} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderSellCreateComponent} from '../order-sell-create/order-sell-create.component';
import {OrderSellDetailComponent} from '../order-sell-detail/order-sell-detail.component';
import {OrderSellEditComponent} from '../order-sell-edit/order-sell-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderNewFilter} from 'src/app/@filter/SO/order.filter';
import {OrderModel, orderDetails} from 'src/app/models/SO/order.model';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {
  STATE_ORDER_NEW,
  LIST_NEW_STATE,
  STATE_ORDER,
  LIST_STATE,
  ORDER_SELL_RIGHTS,
} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
import {LIST_ORDER_TYPE, ORDER_TYPES} from 'src/app/utils/constant/order';
@Component({
  selector: 'app-order-sell-index',
  templateUrl: './order-sell-index.component.html',
  styleUrls: ['./order-sell-index.component.scss'],
})
export class OrderSellIndexComponent {
  maxTagCount = 1;
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };

  faFileExcel = faFileExcel;
  listPartnerAll: any = [];
  listItemAll: any = [];

  displayedColumns: string[] = [
    'index',
    'billNumber',
    // 'company',
    'code',
    'code1',
    'code2',
    'orderDate',
    'vehicle',
    'partnerName',
    'orderDetails',
    'cargoWeight',
    'dvt',
    'state',
    // 'payment',
  ];
  paginationResult!: PaginationResult | any;
  STATE_ORDER = STATE_ORDER;
  LIST_STATE = LIST_STATE;
  ORDER_SELL_RIGHTS = ORDER_SELL_RIGHTS;
  STATE_ORDER_NEW = STATE_ORDER_NEW;
  LIST_NEW_STATE = LIST_NEW_STATE;
  listType = ORDER_TYPES;
  LIST_ORDER_TYPE = LIST_ORDER_TYPE;
  filter = new OrderNewFilter();
  listVehicle: any = [];
  listArea: any = [];
  listCompany: any = [];

  constructor(
    private _service: OrderService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý phiếu xuất hàng',
        path: 'sale-orders/order',
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

  changeSelectedRange($event: any) {
    this.filter.selectedRange = $event;
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
      ItemCode: this.filter.ItemCode,
      States: this.filter.States,
      VehicleCode: this.filter.VehicleCode,
      CompanyCode: this.filter.CompanyCode,
      CompanyType: this.filter.CompanyType,
      Type: 'XUAT_HANG',
    };
    if ('States' in filterFormat && filterFormat.States?.length == 0) {
      delete filterFormat.States;
    }
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-phieu-xuat-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }
  openOrder() {
    this.router.navigate(['sale-orders/order']);
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner({IsCustomer: true}).subscribe(
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

  openCreate() {
    this.drawerService.open(OrderSellCreateComponent).subscribe((result) => {
      console.log(result, 'result');
      if (result?.status && this.utils.checkComponent(OrderSellIndexComponent)) {
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
      .open(OrderSellDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.item);
        } else if (result?.status && this.utils.checkComponent(OrderSellIndexComponent)) {
          this.loadInit();
        }
      });
  }

  openEdit(item: OrderModel) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
      },
    });
    this.drawerService
      .open(OrderSellEditComponent, {
        itemDetail: item,
      })
      .subscribe((result) => {
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(OrderSellIndexComponent)) {
          this.loadInit();
        }
      });
  }
  onSelectionChange(e: any) {
    const checkStates = this.filter.States?.filter((item: string) => item !== '');
    if (checkStates && checkStates?.length > 0) {
      this.filter = {
        ...this.filter,
        States: this.filter.States?.filter((item: string) => item !== ''),
      };
    }
  }

  GetVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
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

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0
          ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD HH:mm:ss')
          : '',
      ToDate:
        this.filter?.selectedRange?.length > 1
          ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD HH:mm:ss')
          : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      States: this.filter.States,
      VehicleCode: this.filter.VehicleCode,
      CompanyCode: this.filter.CompanyCode,
      CompanyType: this.filter.CompanyType,
      Type: 'XUAT_HANG',
    };
    if ('States' in filterFormat && filterFormat.States?.length == 0) {
      delete filterFormat.States;
    }
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        const cloneData = {...data};
        const dataClone = cloneData.data.filter((item: any) => {
          return item.type === 'XUAT_HANG';
        });
        this.paginationResult = {
          ...data,
          data: dataClone.map((item: OrderModel) => {
            return {
              ...item,
            };
          }),
        };
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: OrderNewFilter) => item.code == this.filter.code);
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
    this.GetAllPartner();
    this.GetAllCompany();
    this.GetAllItem();
    this.GetVehicle();
    this.GetArea();
    this.search(first);
  }

  GetAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompany = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  reload() {
    this.filter = new OrderNewFilter();
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
