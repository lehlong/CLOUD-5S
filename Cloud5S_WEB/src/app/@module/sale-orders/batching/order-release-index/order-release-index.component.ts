import {GlobalService} from 'src/app/services/Common/global.service';
import {Component, ViewChild} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import {OrderModel, orderDetails} from 'src/app/models/SO/order.model';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import * as moment from 'moment';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {OrderCreateComponent} from '../../order/order-create/order-create.component';
import {OrderEditComponent} from '../../order/order-edit/order-edit.component';
import {OrderReleaseCreateComponent} from '../order-release-create/order-release-create.component';
import {OrderReleaseEditComponent} from '../order-release-edit/order-release-edit.component';
import {utils} from 'src/app/utils/utils';
import {OrderReleaseService} from 'src/app/services/SO/order-release.service';
import {FormControl} from '@angular/forms';
import {OrderReleaseFilter} from 'src/app/@filter/SO/order-release.filter';
import {
  EORDER_RELEASE_STEPS,
  LIST_ORDER_RELEASE,
  ORDER_RELEASE_STATES,
  OR_STATE_FILTER,
} from 'src/app/utils/constant/orderRelease';
import {OrderReleaseDetailComponent} from '../order-release-detail/order-release-detail.component';
import {MatDialog} from '@angular/material/dialog';
import {ORDER_STEPS, lstStep} from 'src/app/utils/constant/constant';
import {OrderReleaseInfoComponent} from '../order-release-info/order-release-info.component';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {ORDER_RELEASE_RIGHTS} from 'src/app/utils/constant/access-right';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
@Component({
  selector: 'app-order-release-index',
  templateUrl: './order-release-index.component.html',
  styleUrls: ['./order-release-index.component.scss'],
})
export class OrderReleaseIndexComponent {
  @ViewChild('partnerInput') partnerInput: any;
  @ViewChild('itemInput') itemInput: any;
  states = new FormControl();
  selectedStates: any = [];
  listPartnerAll: any = [];
  listItemAll: any = [];

  listPartnerFilter: any = [];
  listItemFilter: any = [];
  faFileExcel = faFileExcel;

  ORDER_RELEASE_RIGHTS = ORDER_RELEASE_RIGHTS;
  filter = new OrderReleaseFilter();

  displayedColumns: string[] = [
    '#',
    '#',
    'STT',
    'Mã đơn',
    'Ngày đặt hàng',
    'Ngày giờ đổ',
    'Sản phẩm',
    'Địa điểm đổ',
    'Khách hàng',
    'Số điện thoại',
    'Lượng đặt',
    'Trạng thái',
    'Người tạo',
  ];
  paginationResult!: PaginationResult;
  state_order = STATE_ORDER;
  list_state_order: any = OR_STATE_FILTER;
  list_state = ORDER_RELEASE_STATES;
  state_orderRelease = LIST_ORDER_RELEASE;
  orderCodesSelected: any = [];
  orSelected: string = '';
  orDetetailSelected: any;

  partnerSelected = {
    code: '',
    name: '',
  };

  itemSelected = {
    code: '',
    name: '',
  };

  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  maxTagCount = 1;

  constructor(
    private _service: OrderService,
    private _oss: OrderReleaseService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    public dialog: MatDialog,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'content.business.order_release.list.breadcrumb',
        path: 'sale-orders/batching',
      },
    ]);
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  ngAfterViewInit() {}

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

  selectItem(item: any, event: any) {
    if (event.isUserInput) {
      this.itemSelected.name = item.name;
      this.itemSelected.code = item.code;
    }
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

  openDetail(code: string) {
    this.drawerService
      .open(OrderReleaseDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result?.openCreate) {
          this.openCreateOr(result);
        }
        if (result?.status && this.utils.checkComponent(OrderReleaseIndexComponent)) {
          const index = this.paginationResult.data.findIndex((o: any) => o.code == result.data?.orderCode);
          if (index < 0) {
            return;
          }
          if (result.event == 'UPDATE_ORDER') {
            this.paginationResult.data[index].state = result.data.state;
          }
          if (result.event == 'CREATE_ORDER_RELEASE') {
            if (this.paginationResult.data[index].state == STATE_ORDER['DA_XAC_NHAN'].value) {
              this.paginationResult.data[index].state = STATE_ORDER['DANG_XUAT_HANG'].value;
            }
            const orderReleases = this.paginationResult.data[index].orderReleases;
            const indexOR = orderReleases.findIndex((or: any) => or.code == result.data.code);
            if (indexOR < 0) {
              this.paginationResult.data[index].orderReleases = [
                ...this.paginationResult.data[index].orderReleases,
                result.data,
              ];
            }
          }
          if (result.event == 'UPDATE_ORDER_RELEASE') {
            const orderReleases = this.paginationResult.data[index].orderReleases;
            const indexOR = orderReleases.findIndex((or: any) => or.code == result.orderRelease.code);
            if (indexOR < 0) {
              return;
            }
            this.paginationResult.data[index].orderReleases[indexOR] = result.orderRelease;
          }
        }
      });
  }

  openCreateOr(params: any) {
    this.drawerService
      .open(OrderReleaseCreateComponent, {
        orderCode: params.orderCode,
        orderDetail: params.orderDetail,
      })
      .subscribe((result) => {
        this.openInforOR(result?.data?.code);
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
      ItemCode: this.filter.ItemCode,
      States: this.filter.States,
    };
    this._oss.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
        };
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: OrderFilter) => item.code == this.filter.code);
          if (detail) {
            this.openDetail(detail);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.GetAllPartner();
    this.GetAllItem();
    this.search(true);
  }

  reload() {
    this.selectedStates = [];
    this.partnerSelected = {
      code: '',
      name: '',
    };
    this.itemSelected = {
      code: '',
      name: '',
    };
    this.filter = new OrderReleaseFilter();
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

  selectOrder(item: OrderModel) {
    const index = this.orderCodesSelected.findIndex((o: string) => o == item.code);
    if (index >= 0) {
      this.orderCodesSelected = this.orderCodesSelected.filter((o: string) => o != item.code);
    } else {
      this.orderCodesSelected = [...this.orderCodesSelected, item.code];
    }
  }

  selectAll(e: any) {
    if (e.target.checked) {
      this.orderCodesSelected = this.paginationResult.data.map((item: any) => item.code);
    } else {
      this.orderCodesSelected = [];
    }
  }

  isChecked(item: OrderModel) {
    const index = this.orderCodesSelected.findIndex((o: string) => o == item.code);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }

  openInforOR(code: string) {
    if (!code) {
      return;
    }
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        orderReleaseCode: code,
      },
    });
    this.drawerService
      .open(OrderReleaseInfoComponent, {
        orderCode: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEditOR(result.item, result.orderDetail);
        } else if (result?.status && this.utils.checkComponent(OrderReleaseIndexComponent)) {
          const index = this.paginationResult.data.findIndex((o: any) => o.code == result.orderCode);
          if (index < 0) {
            return;
          }
          const orderReleases = this.paginationResult.data[index].orderReleases;
          const indexOR = orderReleases.findIndex((or: any) => or.code == result.orderRelease.code);
          if (indexOR < 0) {
            return;
          }
          this.paginationResult.data[index].orderReleases[indexOR] = result.orderRelease;
          this.openInforOR(result.orderRelease.code);
        }
      });
  }

  openEditOR(item: any, orderDetail: any) {
    this.drawerService
      .open(OrderReleaseEditComponent, {
        itemDetail: item,
        orderDetail: orderDetail,
      })
      .subscribe((result) => {
        if (result?.openDetail) {
          this.openInforOR(result?.orderRelease?.code);
        }
        if (result?.status && this.utils.checkComponent(OrderReleaseIndexComponent)) {
          const index = this.paginationResult.data.findIndex((o: any) => o.code == result.orderCode);
          if (index < 0) {
            return;
          }
          const orderReleases = this.paginationResult.data[index].orderReleases;
          const indexOR = orderReleases.findIndex((or: any) => or.code == result.orderRelease.code);
          if (indexOR < 0) {
            return;
          }
          this.paginationResult.data[index].orderReleases[indexOR] = result.orderRelease;
        }
      });
  }

  totalExportNumberMain(ordersDetail: any) {
    if (!ordersDetail) {
      return 0;
    }
    const itemMain = ordersDetail.find((item: any) => item.isMainItem);
    if (!itemMain) {
      return 0;
    }
    return itemMain.orderNumber;
  }

  totalExportNumberSub(ordersDetail: any) {
    if (!ordersDetail) {
      return 0;
    }
    const itemSub = ordersDetail.find((item: any) => !item.isMainItem);
    if (!itemSub) {
      return 0;
    }
    return itemSub.orderNumber;
  }

  getAccumulated(item: any) {
    if (!item?.orderReleases) {
      return 0;
    }
    const orFinish = item?.orderReleases
      .filter((i: any) => i.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH || i.state == EORDER_RELEASE_STEPS.DA_GIAO_HANG)
      .map((os: any) => os.mixNumber);
    if (orFinish.length == 0) {
      return 0;
    }
    return (
      orFinish.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      }) || 0
    );
  }
  exportExcel() {
    const checkStates = this.filter.States?.filter((item: string) => item !== '');
    let filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromPourDate:
        this.filter?.selectedRange?.length > 0
          ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      ToPourDate:
        this.filter?.selectedRange?.length > 1
          ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      States: this.filter.States,
    };
    if ('States' in filterFormat && (!checkStates || checkStates?.length == 0)) {
      delete filterFormat.States;
    } else {
      filterFormat = {
        ...filterFormat,
        States: filterFormat.States?.filter((item: string) => item !== ''),
      };
    }
    return this._oss.ExportExcel(filterFormat).subscribe((result: any) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-phieu-tron.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  onFocusPartner() {
    this.partnerInput.nativeElement.focus();
  }
  onFocusItem() {
    this.itemInput.nativeElement.focus();
  }
}
