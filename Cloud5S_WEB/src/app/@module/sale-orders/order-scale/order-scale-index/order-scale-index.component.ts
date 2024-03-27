import {Component} from '@angular/core';

import {OrderScaleService} from 'src/app/services/SO/order-scale.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderScaleEditComponent} from '../order-scale-edit/order-scale-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderScaleFilter} from 'src/app/@filter/SO/order-scale.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, SCALE_TYPES, LIST_STATE} from 'src/app/utils/constant/order';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {InOutCameraComponent} from '../../in-out/in-out-camera/in-out-camera.component';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {startOfWeek, endOfWeek, addDays, startOfDay, endOfDay, addHours} from 'date-fns';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {GlobalService} from 'src/app/services/Common/global.service';
import {Observable} from 'rxjs';
import {RefreshService} from 'src/app/services/Common/refresh.service';
import Swal from 'sweetalert2';

import {ORDERSCALE_RIGHTS} from 'src/app/utils/constant/index';
import {OrderScaleIndexFilter} from 'src/app/@filter/SO/order-scale-index.filter';
@Component({
  selector: 'app-order-scale-index',
  templateUrl: './order-scale-index.component.html',
  styleUrls: ['./order-scale-index.component.scss'],
})
export class OrderScaleIndexComponent {
  rangePresets = {
    '2 giờ sau': [new Date(), addHours(new Date(), 2)],
    'Hôm nay': [startOfDay(new Date()), endOfDay(new Date())],
    'Ngày mai': [startOfDay(addDays(new Date(), 1)), endOfDay(addDays(new Date(), 1))],
    '3 ngày sau': [new Date(), endOfDay(addDays(new Date(), 3))],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
  };
  listPartnerAll: any = [];
  listScaleState: any = [
    {
      name: 'Tất cả',
      value: null,
    },
    {
      name: 'Hoạt động',
      value: false,
    },
    {
      name: 'Đã hủy',
      value: true,
    },
  ];
  listItemAll: any = [];
  listAreaAll: any = [];
  listCompanyAll: any = [];
  ORDERSCALE_RIGHTS = ORDERSCALE_RIGHTS;
  faFileExcel = faFileExcel;

  listItemFilter: any = [];

  selectedStates: any = [];

  displayedColumns: string[] = [
    'index',
    'billNumber',
    'code',
    'syncCode',
    // 'company',
    'time',
    'scaleTypeCode',
    'customerName',
    'vehicleCode',
    'itemName',
    'area',
    'timeWeight1',
    'weight1',
    'timeWeight2',
    'weight2',
    'weight',
    'unit',
    'invoiceNumber',
    'invoiceTemplate',
    'invoiceSymbol',
  ];
  filterDateRange: Date[] = [moment().subtract(3, 'days').toDate(), moment().toDate()];

  paginationResult!: PaginationResult | any;
  state_order = STATE_ORDER;
  list_state = LIST_STATE;
  filter = new OrderScaleIndexFilter();
  SCALE_TYPES = SCALE_TYPES;
  date = [null, null];
  vehicleAll: any[] = [];

  firstSign: boolean = true;
  weight1: boolean = true;
  weight2: boolean = true;
  isCanceled: any = null;

  constructor(
    private _service: OrderScaleService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    public utils: utils,
    private dialog: MatDialog,
    private refreshService: RefreshService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách phiếu cân',
        path: 'sale-orders/orderscale',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      if (params?.States !== '') {
        this.selectedStates = this.list_state.filter((item: any) => {
          return params?.States?.includes(item.value);
        });
      }
      this.route.queryParams.subscribe((params: any) => {
        if (params.fromDate && params.toDate) {
          this.filter.selectedRange[0] = params.fromDate;
          this.filter.selectedRange[1] = params.toDate;
        }
      });
    });
  }

  ngAfterViewInit() {
    this.refreshService.hubReceive.subscribe((message: any) => {
      if (message) {
        this.search();
      }
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }
  userTypeFilter: any;
  selectItemType(userType: {value: string; label: string}, event: any) {}
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  GetAllArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listAreaAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompanyAll = data;
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
  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.vehicleAll = data;
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

  openEdit(item: any) {
    this.drawerService
      .open(OrderScaleEditComponent, {
        code: item.code,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(OrderScaleIndexComponent)) {
          this.loadInit();
        }
      });
  }

  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: 2000,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0
          ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      ToDate:
        this.filter?.selectedRange?.length > 1
          ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      VehicleCode: this.filter.VehicleCode,
      areaCode: this.filter.areaCode,
      companyCode: this.filter.companyCode,
      weight1: this.weight1 ? true : false,
      weight2: this.weight2 ? true : false,
      isCanceled: this.isCanceled,
    };
    return this._service.ExportReportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'phieu-can-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  changeSelectedRange($event: any) {
    this.filter.selectedRange = $event;
  }
  search() {
    console.log(this.filter.selectedRange);
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
      VehicleCode: this.filter.VehicleCode,
      areaCode: this.filter.areaCode,
      scaleTypeCode: this.userTypeFilter === 'BUY' || null,
      Type: this.filter.scaleTypeCode || null,
      companyCode: this.filter.companyCode,
      weight1: this.weight1 ? true : false,
      weight2: this.weight2 ? true : false,
      isCanceled: this.isCanceled,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.firstSign = false;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.GetAllCompany();
    this.GetAllPartner();
    this.GetAllVehicle();
    this.GetAllArea();
    this.GetAllItem();
    this.search();
  }

  reload() {
    this.selectedStates = [];
    this.filter = new OrderScaleIndexFilter();
    this.search();
    this.userTypeFilter = '';
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

  handleCheckboxChange() {
    this.search();
  }

  redirect() {
    this.router.navigate(['/sale-orders/report-orderscale'], {
      queryParams: {fromDate: this.filter.selectedRange[0], toDate: this.filter.selectedRange[1]},
    });
  }
}
