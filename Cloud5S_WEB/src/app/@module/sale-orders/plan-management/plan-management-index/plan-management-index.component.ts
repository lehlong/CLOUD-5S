import {startOfWeek, endOfWeek, addDays, startOfDay, endOfDay, addHours} from 'date-fns';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {ORDER_RIGHTS, STATE_ORDER} from 'src/app/utils/constant';
import {utils} from 'src/app/utils/utils';
import {OrderCreateComponent} from '../../order/order-create/order-create.component';
import {OrderDetailComponent} from '../../order/order-detail/order-detail.component';
import {OrderEditComponent} from '../../order/order-edit/order-edit.component';
import {OrderModel, orderDetails} from 'src/app/models/SO/order.model';
import {FormControl} from '@angular/forms';
import {LIST_STATE_PLAN, PLAN_MANAGEMENT, listRadioOption} from 'src/app/utils/constant/plan-management';
import {PlanFilter} from 'src/app/@filter/SO/plan.filter';
import * as moment from 'moment';
import {PlanManagementService} from 'src/app/services/SO/plan-management.service';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import Swal from 'sweetalert2';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-plan-management-index',
  templateUrl: './plan-management-index.component.html',
  styleUrls: ['./plan-management-index.component.scss'],
})
export class PlanManagementIndexComponent {
  faFileExcel = faFileExcel;
  listPartnerAll: any = [];
  listItemAll: any = [];
  listMixerAll: any = [];
  states = new FormControl();

  listPartnerFilter: any = [];
  listItemFilter: any = [];
  listMixerFilter: any = [];

  selectedStates: any = [];

  displayedColumns: string[] = [
    'index',
    'mixer',
    'code',
    'createDate',
    'pourDate',
    'itemName',
    'orderNumber',
    'partnerName',
    'pourLocation',
    'state',
  ];
  paginationResult!: PaginationResult;
  STATE_ORDER = STATE_ORDER;
  LIST_STATE = LIST_STATE_PLAN;
  ORDER_RIGHTS = ORDER_RIGHTS;
  list_state_order: any = PLAN_MANAGEMENT;
  filter = new PlanFilter();
  selectedOption: any;
  listRadioOption = listRadioOption;
  partnerSelected = {
    code: '',
    name: '',
  };

  itemSelected = {
    code: '',
    name: '',
  };

  mixerSelected = {
    code: '',
    name: '',
  };

  updateListOrder: any = [];
  date: any;
  maxTagCount = 1;
  rangePresets = {
    '2 giờ sau': [new Date(), addHours(new Date(), 2)],
    'Hôm nay': [startOfDay(new Date()), endOfDay(new Date())],
    'Ngày mai': [startOfDay(addDays(new Date(), 1)), endOfDay(addDays(new Date(), 1))],
    '3 ngày sau': [new Date(), endOfDay(addDays(new Date(), 3))],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
  };

  constructor(
    private _service: PlanManagementService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private _os: OrderService,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'content.business.plan_management.list.breadcrumb',
        path: 'sale-orders/plan-management',
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

  onChangeMixer(event: any) {
    this.listMixerFilter = this.listMixerAll.filter((item: any) => {
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

  selectMixer(item: any, event: any) {
    if (event.isUserInput) {
      this.mixerSelected.name = item.name;
      this.mixerSelected.code = item.code;
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

  GetAllMixer() {
    this.dropdownService.GetAllMixer().subscribe(
      ({data}) => {
        this.listMixerAll = data;
        this.listMixerFilter = data;
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
      .open(OrderDetailComponent, {
        code: code,
        isPlan: true,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(PlanManagementIndexComponent)) {
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
      .open(OrderEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(PlanManagementIndexComponent)) {
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

  search(first: boolean = false) {
    const filterFormat = {
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
      MixerCode: this.filter.MixerCode,
    };
    if ('States' in filterFormat && filterFormat.States?.length == 0) {
      delete filterFormat.States;
    }
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
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: OrderFilter) => item.code == this.filter.code);
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
    this.GetAllItem();
    this.GetAllMixer();
    this.search(first);
  }

  reload() {
    this.selectedStates = [];
    this.selectedOption = '';
    this.partnerSelected = {
      code: '',
      name: '',
    };
    this.itemSelected = {
      code: '',
      name: '',
    };
    this.date = null;
    this.filter = new PlanFilter();
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

  onSelectMixer(e: any, order: any) {
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == order.code);
    if (index >= 0) {
      this.updateListOrder[index].mixerCode = e.target.value;
    } else {
      this.updateListOrder = [...this.updateListOrder, {orderCode: order.code, mixerCode: e.target.value}];
    }
  }

  onUpdate() {
    Swal.fire({
        showCloseButton: true,
      title: 'Bạn muốn cập nhật máy trộn cho đơn hàng?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._os.UpdateMixerOrders(this.updateListOrder).subscribe(
          (data) => {
            this.loadInit(true);
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  isEnableSelect(item: any) {
    return (
      item?.state == STATE_ORDER['KHOI_TAO'].value ||
      item?.state == STATE_ORDER['DA_XAC_NHAN'].value ||
      item?.state == STATE_ORDER['DANG_XUAT_HANG'].value
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
      MixerCode: this.filter.MixerCode,
    };
    if ('States' in filterFormat && (!checkStates || checkStates?.length == 0)) {
      delete filterFormat.States;
    } else {
      filterFormat = {
        ...filterFormat,
        States: filterFormat.States?.filter((item: string) => item !== ''),
      };
    }
    return this._service.ExportExcel(filterFormat).subscribe((result: any) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-ke-hoach.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}
