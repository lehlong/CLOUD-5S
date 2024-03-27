import {Component} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderCreateComponent} from '../order-create/order-create.component';
import {OrderDetailComponent} from '../order-detail/order-detail.component';
import {OrderEditComponent} from '../order-edit/order-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderNewFilter} from 'src/app/@filter/SO/order.filter';
import {OrderModel, orderDetails} from 'src/app/models/SO/order.model';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER_NEW, LIST_NEW_STATE, LIST_STATE, ORDER_RIGHTS, STATE_ORDER_PAY} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
import {LIST_ORDER_TYPE, ORDER_TYPES} from 'src/app/utils/constant/order';
import Swal from 'sweetalert2';
import {RefreshService} from 'src/app/services/Common/refresh.service';
import {OrderScaleEditComponent} from '../../order-scale/order-scale-edit/order-scale-edit.component';
import {OrderScaleIndexComponent} from '../../order-scale/order-scale-index/order-scale-index.component';

@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html',
  styleUrls: ['./order-index.component.scss'],
})
export class OrderIndexComponent {
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
    'orderDate',
    'vehicle',
    'partnerName',
    'orderDetails',
    'area',
    'cargoWeight',
    'dvt',
    'state',
    'payment',
    '#',
  ];
  paginationResult!: PaginationResult | any;
  STATE_ORDER_NEW = STATE_ORDER_NEW;
  STATE_ORDER_PAY = STATE_ORDER_PAY;
  LIST_STATE = LIST_STATE;
  LIST_NEW_STATE = LIST_NEW_STATE;
  ORDER_RIGHTS = ORDER_RIGHTS;
  listVehicle: any = [];
  listArea: any = [];
  LIST_ORDER_TYPE = LIST_ORDER_TYPE;
  filter = new OrderNewFilter();
  listCompany: any = [];
  ORDER_TYPES = ORDER_TYPES;
  listPaid: any = [
    {
      name: 'Đã thanh toán',
      value: true,
    },
    {
      name: 'Chưa thanh toán',
      value: false,
    },
  ];

  constructor(
    private _service: OrderService,
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
        name: 'Quản lý phiếu nhập hàng',
        path: 'sale-orders/order',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      console.log('params: ', params);
      this.filter = {
        ...this.filter,
        ...params,
        isPaid: params?.isPaid ? JSON.parse(params?.isPaid?.toLowerCase()) : null,
      };
      console.log(this.filter);
    });
  }

  ngAfterViewInit() {
    this.refreshService.hubReceive.subscribe((message: any) => {
      if (message) {
        this.search();
      }
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
      AreaCode: this.filter.AreaCode,
      isPaid: this.filter.isPaid,
      Type: 'NHAP_HANG',
    };
    if ('States' in filterFormat && filterFormat.States?.length == 0) {
      delete filterFormat.States;
    }
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-phieu-nhap-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }
  openOrderSell() {
    this.router.navigate(['sale-orders/order-sell']);
  }
  GetAllPartner() {
    this.dropdownService
      .GetAllPartner({
        IsProvider: true,
      })
      .subscribe(
        ({data}) => {
          this.listPartnerAll = data;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
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

  openCreate() {
    this.drawerService.open(OrderCreateComponent).subscribe((result) => {
      console.log(result, 'result');
      if (result?.status && this.utils.checkComponent(OrderIndexComponent)) {
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
      .open(OrderDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.item);
        } else if (result?.status && this.utils.checkComponent(OrderIndexComponent)) {
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
      .open(OrderEditComponent, {
        itemDetail: item,
      })
      .subscribe((result) => {
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(OrderIndexComponent)) {
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

  openEditorderscale(item: any) {
    console.log(item);
    this.drawerService

      .open(OrderScaleEditComponent, {
        code: item.scaleCode,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(OrderIndexComponent)) {
          this.loadInit();
        }
      });
  }

  onConfirm(code: any) {
    Swal.fire({
      showCloseButton: true,
      title: 'Bạn muốn xác nhận thanh toán?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.ConfirmPay({code: code}).subscribe(
          (data) => {
            this.drawerService.returnData(data);
            this.search();
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
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
      AreaCode: this.filter.AreaCode,
      isPaid: this.filter.isPaid,
      Type: 'NHAP_HANG',
    };
    if ('States' in filterFormat && filterFormat.States?.length == 0) {
      delete filterFormat.States;
    }
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data?.data.map((item: OrderModel) => {
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
