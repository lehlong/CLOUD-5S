import {startOfWeek, endOfWeek, addDays, startOfDay, endOfDay, addHours} from 'date-fns';
import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {ORDER_RIGHTS, STATE_ORDER} from 'src/app/utils/constant';
import {utils} from 'src/app/utils/utils';

import {OrderModel, orderDetails} from 'src/app/models/SO/order.model';
import {FormControl} from '@angular/forms';
import {LIST_STATE_PLAN, PLAN_MANAGEMENT, listRadioOption} from 'src/app/utils/constant/plan-management';
import {PlanFilter} from 'src/app/@filter/SO/plan.filter';
import * as moment from 'moment';
import {PlanManagementService} from 'src/app/services/SO/plan-management.service';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import Swal from 'sweetalert2';
import {GlobalService} from 'src/app/services/Common/global.service';
import {OrderCreateComponent} from 'src/app/@module/sale-orders/order/order-create/order-create.component';
import {OrderDetailComponent} from 'src/app/@module/sale-orders/order/order-detail/order-detail.component';
import {OrderEditComponent} from 'src/app/@module/sale-orders/order/order-edit/order-edit.component';
import {PrintService} from 'src/app/services/Common/print.service';
import {ManufactureCommandPrintComponent} from 'src/app/@module/print-templates/manufacture-command-print/manufacture-command-print.component';
@Component({
  selector: 'app-manufacture-command-index',
  templateUrl: './manufacture-command-index.component.html',
  styleUrls: ['./manufacture-command-index.component.scss'],
})
export class ManufactureCommandIndexComponent {
  time: Date | null = new Date();
  //
  filterType: any = false;
  typeFilter: string = '';
  faFileExcel = faFileExcel;
  listPartnerAll: any = [];
  listItemAll: any = [];
  listMixerAll: any = [];
  states = new FormControl();

  selectedStates: any = [];

  displayedColumns: string[] = [
    'index',
    'mixer',
    // 'mixHouse',
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
    private printService: PrintService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Lệnh sản xuất',
        path: 'business/manufacture-command',
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
  onFilterChange(event: any) {
    this.search();
  }
  showCommandList() {
    this.typeFilter = 'type3';
    this.search();
  }
  AllCommandList() {
    this.typeFilter = '';
    this.filterType = false;
    this.search();
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

  GetAllMixer() {
    this.dropdownService.GetAllMixer().subscribe(
      ({data}) => {
        this.listMixerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  openCreate() {
    this.drawerService.open(OrderCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ManufactureCommandIndexComponent)) {
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
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(ManufactureCommandIndexComponent)) {
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
        } else if (result?.status && this.utils.checkComponent(ManufactureCommandIndexComponent)) {
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
    let IsSetReleaseDate;
    if (this.filterType === false) {
      IsSetReleaseDate = null;
    }
    if (this.filterType === true) {
      IsSetReleaseDate = false;
    }
    if (this.typeFilter === 'type3') {
      IsSetReleaseDate = true;
    }
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange_1?.length > 0
          ? moment(this.filter?.selectedRange_1[0])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      ToDate:
        this.filter?.selectedRange_1?.length > 1
          ? moment(this.filter?.selectedRange_1[1])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      FromPourDate:
        this.filter?.selectedRange?.length > 0
          ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      ToPourDate:
        this.filter?.selectedRange?.length > 1
          ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      FromReleaseDate:
        this.filter?.selectedRange_2?.length > 0
          ? moment(this.filter?.selectedRange_2[0])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      ToReleaseDate:
        this.filter?.selectedRange_2?.length > 1
          ? moment(this.filter?.selectedRange_2[1])?.format('YYYY-MM-DDTHH:mm:ss')
          : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      States: this.filter.States,
      MixerCode: this.filter.MixerCode,
      IsSetReleaseDate: IsSetReleaseDate,
    };
    if ('States' in filterFormat && filterFormat.States?.length == 0) {
      delete filterFormat.States;
    }
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
        };
        console.log('this.paginationResult', this.paginationResult);
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

    this.date = null;
    this.filter = new PlanFilter();
    this.filterType = false;
    this.typeFilter = '';
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
      const dayReceive = moment(order.releaseDate).format('DD/MM/yyyy HH:mm');
      this.updateListOrder = [
        ...this.updateListOrder,
        {orderCode: order.code, mixerCode: e.target.value, releaseDate: dayReceive},
      ];
    }
    console.log('this.updateListOrder', this.updateListOrder);
  }
  onSelectMixDay(e: any, order: any) {
    const dayTyping = moment(e).format('DD/MM/yyyy');
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == order.code);
    if (index >= 0) {
      const oldReleaseDate = this.updateListOrder[index].releaseDate;
      const splitArray = oldReleaseDate.split(' ');
      const hour = splitArray[1];
      this.updateListOrder[index].releaseDate = dayTyping + ' ' + hour;
    } else {
      const dayReceive = moment(order.releaseDate).format('DD/MM/yyyy HH:mm');
      this.updateListOrder = [
        ...this.updateListOrder,
        {orderCode: order.code, mixerCode: order.mixerCode, releaseDate: dayReceive},
      ];
    }
    console.log('this.updateListOrder', this.updateListOrder);
  }
  onSelectMixHouse(e: any, order: any) {
    const hourTyping = moment(e).format('HH:mm');
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == order.code);
    if (index >= 0) {
      const oldReleaseDate = this.updateListOrder[index].releaseDate;
      const splitArray = oldReleaseDate.split(' ');
      const day = splitArray[0];
      this.updateListOrder[index].releaseDate = day + ' ' + hourTyping;
    } else {
      const dayReceive = moment(order.releaseDate).format('DD/MM/yyyy HH:mm');
      this.updateListOrder = [...this.updateListOrder, {orderCode: order.code, releaseDate: dayReceive}];
    }
    console.log('this.updateListOrder', this.updateListOrder);
  }

  onUpdate() {
    const cloneUpdateListOrder = this.updateListOrder.map((item: any) => {
      const _releaseDate = item.releaseDate;
      const parsedDate = moment.utc(_releaseDate, 'DD/MM/yyyy HH:mm');
      const isoFormattedDate = parsedDate.toISOString();
      return {
        ...item,
        releaseDate: isoFormattedDate,
      };
    });
    Swal.fire({
        showCloseButton: true,
      title: 'Bạn muốn cập nhật lệnh sản xuất?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._os.UpdateMixerOrders(cloneUpdateListOrder).subscribe(
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
  printManufactureCommandReceipt() {
    this.printService.printComponent(
      {
        data: this.paginationResult,
        // company: this.companyInfo,
      },
      ManufactureCommandPrintComponent,
      this.viewContainerRef,
      'manufacture-command.css',
    );
  }
}
