import {Component} from '@angular/core';
import {GlobalService} from 'src/app/services/Common/global.service';
import {OrderDeliveryModel} from 'src/app/models/SO/orderDelivery.model';
import {utils} from 'src/app/utils/utils';
import {OrderDeliverySearchFilter} from 'src/app/@filter/SO/order-delivery.filter';
import OrderDeliveryService from 'src/app/services/SO/order-delivery.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderExportFilter} from 'src/app/@filter/SO/order.filter';
import {OrderService} from 'src/app/services/SO/order.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER_NEW, STATE_ORDER_DELIVERY, ORDER_DELIVERY_MANAGEMENT_RIGHTS} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderDeliveryDetailComponent} from '../../order-delivery/order-delivery-detail/order-delivery-detail.component';
import {OrderSellDetailComponent} from '../../order-sell/order-sell-detail/order-sell-detail.component';
@Component({
  selector: 'app-order-delivery-management-index',
  templateUrl: './order-delivery-management-index.component.html',
  styleUrls: ['./order-delivery-management-index.component.scss'],
})
export class OrderDeliveryManagementIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  filter = new OrderDeliverySearchFilter();
  dataDeliveryManagement: any = [];
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
  listPendingShip: any = [];
  listCompletedDelivery: any = [];
  totalPendingShip: number = 0;
  totalWeightPendingShip: number = 0;
  totalWeightCompletedDelivery: number = 0;
  totalCompletedDelivery: number = 0;
  filterExport = new OrderExportFilter();
  listVehicle: any = [];
  STATE_ORDER_NEW = STATE_ORDER_NEW;
  shipForm: any = [];
  listBerth: any = [];
  // selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  selectedRange: Date[] = [];
  paginationResult!: PaginationResult;
  STATE_ORDER_DELIVERY = STATE_ORDER_DELIVERY;
  ORDER_DELIVERY_MANAGEMENT_RIGHTS = ORDER_DELIVERY_MANAGEMENT_RIGHTS;
  paginationShipResult!: PaginationResult;
  paginationCompletedResult!: PaginationResult;
  unitNameShip: any = "Kg";
  unitNameDelivery: any = "Kg";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
    private _service: OrderDeliveryService,
    private _order: OrderService,
    private dropdownService: DropdownService,
    private drawerService: DrawerService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý giao nhận',
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

  ngOnInit(): void {
    this.loadInit(true);
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
        // if (result.openEdit) {
        //   this.openEdit(result.item);
        // } else if (result?.status) {
        //   this.loadInit();
        // }
      });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      State: 'DANG_XUAT_HANG',
    };

    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.dataDeliveryManagement = data.data;
        if (this.dataDeliveryManagement.length) {
          this.getPendingShip();
          this.getCompletedDelivery();
        } else {
          this.getAllOrderDelivery();
        }
      },
      error: (response: any) => {
        console.log(response);
      },
    });
  }

  getAllOrderDelivery() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      // FromDate: this.selectedRange.length > 0 ? moment(this.selectedRange[0])?.format('YYYY-MM-DD') : '',
      // ToDate: this.selectedRange?.length > 1 ? moment(this.selectedRange[1])?.format('YYYY-MM-DD') : '',
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
      },
      error: (response: any) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.search(first);
    this.GetBerth();
    this.GetVehicle();
  }

  reload() {
    this.search(true);
  }
  toPercent(num1: any, num2: any) {
    let result = (parseInt(num1) / parseInt(num2)) * 100;
    return result.toFixed(2) + '%';
  }

  toFixed(num1: any, num2: any) {
    let result = (parseInt(num1) / parseInt(num2)) * 100;
    return result.toFixed(2);
  }

  getPendingShip() {
    const filterExport = {
      currentPage: this.filterExport.currentPage,
      pageSize: this.filterExport.pageSize,
      keyWord: this.filterExport.keyWord,
      VehicleCode: this.filterExport?.VehicleCode,
      Type: 'XUAT_HANG',
      BatchCode: this.dataDeliveryManagement[0].code,
      States: ['RA_CONG', 'CAN_LAN_2', 'DEN_CANG'],
    };

    this._order.SearchOrderByUpdate(filterExport).subscribe((res) => {
      this.paginationShipResult = res?.data;
      this.listPendingShip = res?.data?.data;
      if(this.listPendingShip) {
        this.unitNameShip = this.listPendingShip[0]?.orderDetails[2]?.unit?.name;
        this.listPendingShip.filter((i: any) => {
          this.shipForm.push({
            cargoCompartmentNumber: '',
            berthCode: '',
            getOffTime: new Date(),
          });
        });
        this.totalWeightPendingShip = this.listPendingShip.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue?.scale?.weight,
          0,
        );
      }
      this.totalPendingShip = res?.data?.totalRecord;
    });
  }

  onChangePageShip(pageNumber: number) {
    this.filterExport.currentPage = pageNumber;
    this.getPendingShip();
  }

  pageSizeChangeShip(pageSize: number) {
    this.filterExport.currentPage = 1;
    this.filterExport.pageSize = pageSize;
    this.getPendingShip();
  }

  getCompletedDelivery() {
    const filterExport = {
      currentPage: this.filterExport.currentPage,
      pageSize: this.filterExport.pageSize,
      keyWord: this.filterExport.keyWord,
      FromDate: this.selectedRange.length > 0 ? moment(this.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.selectedRange?.length > 1 ? moment(this.selectedRange[1])?.format('YYYY-MM-DD') : '',
      VehicleCode: this.filterExport?.VehicleCode,
      Type: 'XUAT_HANG',
      BatchCode: this.dataDeliveryManagement[0].code,
      States: ['DO_HANG'],
    };

    this._order.SearchOrderByUpdate(filterExport).subscribe((res) => {
      this.paginationCompletedResult = res?.data;
      this.listCompletedDelivery = res?.data?.data;
      if(this.listCompletedDelivery) {
        this.unitNameDelivery = this.listCompletedDelivery[0]?.orderDetails[0]?.unit?.name;
        this.totalWeightCompletedDelivery = this.listCompletedDelivery.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue?.scale?.weight,
          0,
        );
      }
      this.totalCompletedDelivery = res?.data?.totalRecord;
    });
  }

  onChangePageCompleted(pageNumber: number) {
    this.filterExport.currentPage = pageNumber;
    this.getCompletedDelivery();
  }

  pageSizeChangeCompleted(pageSize: number) {
    this.filterExport.currentPage = 1;
    this.filterExport.pageSize = pageSize;
    this.getCompletedDelivery();
  }

  onDateRangeChange(event: any) {
    this.selectedRange = event;
    this.getCompletedDelivery();
  }

  onVehicleChange(event: any) {
    this.filterExport.VehicleCode = event;
    this.getPendingShip();
  }
  onVehicleDeliveryChange(event: any) {
    this.filterExport.VehicleCode = event;
    this.getCompletedDelivery();
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
  GetBerth() {
    this.dropdownService.GetAllBerth().subscribe(
      ({data}) => {
        this.listBerth = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onSave(code: any, index: any) {
    if (!this.shipForm[index].getOffTime) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng chọn thời gian xuống tàu',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    if (!this.shipForm[index].berthCode) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng chọn cầu cảng',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }

    if (!this.shipForm[index].cargoCompartmentNumber) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng nhập hầm tàu',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    this.shipForm[index].getOffTime = moment(this.shipForm[index].getOffTime).format('YYYY-MM-DDTHH:mm:ss');
    let objectInsert = {
      ...this.shipForm[index],
      code,
    };

    this._order.UpdateBerth(objectInsert).subscribe(
      (data) => {
        this.shipForm[index].berthCode = '';
        this.shipForm[index].cargoCompartmentNumber = '';
        this.getPendingShip();
        this.getCompletedDelivery();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  openDetailSell(code: string = '') {
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
        // if (result.openEdit) {
        //   this.openEdit(result.item);
        // } else if (result?.status && this.utils.checkComponent(OrderSellIndexComponent)) {
        //   this.loadInit();
        // }
      });
  }
}
