import {Component} from '@angular/core';
import {OrderDeliverySearchFilter} from 'src/app/@filter/SO/order-delivery.filter';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {LIST_STATE, LIST_ORDER_TYPE, STATE_ORDER, STATE_ORDER_DELIVERY} from 'src/app/utils/constant/order';
import OrderDeliveryService from 'src/app/services/SO/order-delivery.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from 'src/app/services/Common/global.service';
import {OrderDeliveryModel} from 'src/app/models/SO/orderDelivery.model';
import {OrderDeliveryCreateComponent} from '../order-delivery-create/order-delivery-create.component';
import {utils} from 'src/app/utils/utils';
import {OrderDeliveryDetailComponent} from '../order-delivery-detail/order-delivery-detail.component';
import {RefreshService} from 'src/app/services/Common/refresh.service';
import {ORDER_DELIVERY_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-order-delivery-index',
  templateUrl: './order-delivery-index.component.html',
  styleUrls: ['./order-delivery-index.component.scss'],
})
export class OrderDeliveryIndexComponent {
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
  listVehicle: any = [];
  listShip: any = [];

  displayedColumns: string[] = [
    'index',
    'code',
    'startDate',
    'endDate',
    'orderBatchDetails',
    'exportShip',
    'totalVehicle',
    'deliveryNumber',
    'expectedWeight',
    'exportedWeight',
    'progress',
    'state',
  ];
  paginationResult!: PaginationResult;
  STATE_ORDER = STATE_ORDER;
  LIST_STATE = LIST_STATE;
  STATE_ORDER_DELIVERY = STATE_ORDER_DELIVERY;
  LIST_ORDER_TYPE = LIST_ORDER_TYPE;
  filter = new OrderDeliverySearchFilter();
  // selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  selectedRange: Date[] = [];
  ORDER_DELIVERY_RIGHTS = ORDER_DELIVERY_RIGHTS;

  constructor(
    private _service: OrderDeliveryService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
    private refreshService: RefreshService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý đợt xuất hàng',
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

  ngAfterViewInit() {
    this.refreshService.hubReceive.subscribe((message: any) => {
      if (this.filter.code == '') {
        this.search();
      }
    });
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  ngOnInit(): void {
    this.loadInit(true);
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

  openCreate() {
    this.drawerService.open(OrderDeliveryCreateComponent).subscribe((result) => {
      console.log(result, 'result');
      // if (result?.status && this.utils.checkComponent(OrderDeliveryCreateComponent)) {
      if (result?.status) {
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
      .open(OrderDeliveryDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.item);
        } else if (result?.status) {
          this.loadInit();
        }
      });
  }

  openEdit(item: OrderDeliveryModel) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
      },
    });
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

  GetShip() {
    this.dropdownService.GetAllShip().subscribe(
      ({data}) => {
        this.listShip = data;
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
      FromDate: this.selectedRange.length > 0 ? moment(this.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.selectedRange?.length > 1 ? moment(this.selectedRange[1])?.format('YYYY-MM-DD') : '',
      VehicleCode: this.filter.VehicleCode,
      ShipCode: this.filter.ShipCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data?.data.map((item: OrderDeliveryModel) => {
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
          const detail = data?.data?.find((item: any) => item.code == this.filter.code);
          if (detail) {
            this.openDetail(detail?.code);
          }
        }
      },
      error: (response: any) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetShip();
    this.GetVehicle();
    this.search(first);
  }

  toFixed(num1: any, num2: any) {
    let result = (parseInt(num1) / parseInt(num2)) * 100;
    return result.toFixed(2);
  }

  reload() {
    this.filter = new OrderDeliverySearchFilter();
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
      FromDate: this.selectedRange.length > 0 ? moment(this.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.selectedRange?.length > 1 ? moment(this.selectedRange[1])?.format('YYYY-MM-DD') : '',
      VehicleCode: this.filter.VehicleCode,
      ShipCode: this.filter.ShipCode,
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-dot-xuat-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}
