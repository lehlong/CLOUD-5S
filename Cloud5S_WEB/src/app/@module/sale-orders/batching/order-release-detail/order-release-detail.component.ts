import {Component, OnInit, HostListener, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {ACTION_ORDER, ORDER_TYPE_ITEM, STATE_ORDER} from 'src/app/utils/constant';
import Swal from 'sweetalert2';
import {OrderReleaseCreateComponent} from '../order-release-create/order-release-create.component';
import {utils} from 'src/app/utils/utils';
import {OrderReleaseEditComponent} from '../order-release-edit/order-release-edit.component';
import {EORDER_RELEASE_STEPS, LIST_ORDER_RELEASE} from 'src/app/utils/constant/orderRelease';
import {PrintService} from 'src/app/services/Common/print.service';
import {OrderReleasePrintComponent} from 'src/app/@module/print-templates/order-release-print/order-release-print.component';
import {OrderReleaseFilter} from 'src/app/@filter/SO/order-release.filter';
import {ORDER_RELEASE_RIGHTS} from 'src/app/utils/constant/access-right';
import {OrderReleaseInfoComponent} from '../order-release-info/order-release-info.component';

@Component({
  selector: 'app-order-release-detail',
  templateUrl: './order-release-detail.component.html',
  styleUrls: ['./order-release-detail.component.scss'],
})
export class OrderReleaseDetailComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  stateDetail: string = '';
  STATE_ORDER = STATE_ORDER;
  ACTION_ORDER = ACTION_ORDER;
  state_orderRelease = LIST_ORDER_RELEASE;
  orderForm: FormGroup;
  submitted: boolean = false;
  displayDate: string | null = 'Ngày đổ';
  listPartnerAll: any = [];
  listPourTypeAll: any = [];
  listOrderTypeAll: any = [];
  listItemAllMain: any = [];
  listItemAllSub: any = [];
  listAreaAll: any = [];
  listSandAll: any = [];
  listStoneAll: any = [];

  listPartnerFilter: any = [];
  listItemFilterMain: any = [];
  listItemFilterSub: any = [];

  currentTab: number = 1;
  code: string = '';

  isFromOrderRelease: boolean = false;
  ordersDetail: any = [];
  orderReleases: any = [];
  dataDetail: any;
  itemMain: any;
  itemSub: any;
  filter = new OrderReleaseFilter();
  ORDER_RELEASE_RIGHTS = ORDER_RELEASE_RIGHTS;
  constructor(
    private _service: OrderService,
    private _ps: PrintService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.orderForm = this._fb.group({
      partnerCode: ['', [Validators.required]],
      partnerName: ['', [Validators.required]],
      address: [''],
      phoneNumber: [''],
      partnerNote: '',
      pourDate: ['', [Validators.required]],
      pourTime: ['', [Validators.required]],
      pourLocation: ['', [Validators.required]],
      areaCode: '',
      pourCategory: '',
      orderTypeCode: ['', [Validators.required]],
      itemCodeMain: ['', [Validators.required]],
      itemNameMain: ['', [Validators.required]],
      slump: ['', [Validators.required]],
      unitCodeMain: [''],
      orderNumberMain: [0, [Validators.required]],
      sandCode: ['', [Validators.required]],
      stoneCode: ['', [Validators.required]],
      itemCodeSub: '',
      itemNameSub: '',
      unitCodeSub: [''],
      orderNumberSub: 0,
    });
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

  loadInit() {
    this.GetDetail();
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.dataDetail = data;
          this.itemMain = data?.orderDetails?.find((item: any) => item.isMainItem);
          this.itemSub = data?.orderDetails?.find((item: any) => !item.isMainItem);
          this.stateDetail = data?.state;
          this.ordersDetail = data?.orderDetails;
          this.orderReleases = data?.orderReleases;
          this.orderForm.patchValue({
            partnerCode: data?.partner?.code || '',
            partnerName: data?.partner?.name || '',
            address: data?.partner?.name || '',
            phoneNumber: data?.partner?.phoneNumber || '',
            partnerNote: data?.partnerNote || '',
            pourDate: data?.pourDate ? moment(data.pourDate).format('YYYY-MM-DD') : null,
            pourTime: data?.pourDate ? moment(data.pourDate).format('HH:mm') : null,
            pourLocation: data?.pourLocation || '',
            areaCode: data?.areaCode || '',
            pourCategory: data?.pourCategory || '',
            orderTypeCode: data?.orderTypeCode || '',
            // itemCodeMain: itemMain?.item?.code || itemMain?.itemCode || '',
            // itemNameMain: itemMain?.item?.name || '',
            // slump: itemMain?.slump || '',
            // unitCodeMain: itemMain?.item?.unit?.name || '',
            // orderNumberMain: itemMain?.orderNumber || 0,
            // sandCode: itemMain?.sandCode || '',
            // stoneCode: itemMain?.stoneCode || '',
            // itemCodeSub: itemSub?.item?.code || '',
            // itemNameSub: itemSub?.item?.name || '',
            // unitCodeSub: itemSub?.item?.unit?.name || '',
            // orderNumberSub: itemSub?.orderNumber || 0,
          });
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  changeTab(tab: number) {
    this.currentTab = tab;
    this.drawerService.returnData({
      type: 'tab',
      tab: tab,
    });
  }

  isConfirmOrder() {
    return this.stateDetail == STATE_ORDER['DA_XAC_NHAN'].value;
  }

  isExportOrder() {
    return this.stateDetail == STATE_ORDER['DANG_XUAT_HANG'].value;
  }

  openEdit(item: any) {
    this.drawerService
      .open(OrderReleaseInfoComponent, {
        orderCode: item.code,
        orderDetail: this.dataDetail,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(OrderReleaseDetailComponent)) {
          this.loadInit();
        }
      });
  }

  onCreateOrderRelease() {
    this.drawerService.returnData({orderCode: this.code, orderDetail: this.dataDetail, openCreate: true});
  }

  onConfirmMix() {
    Swal.fire({
        showCloseButton: true,
      title: 'Bạn muốn xác nhận hoàn thành trộn cho đơn hàng?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.CompleteMixState({code: this.code}).subscribe(
          (data) => {
            this.filter = {
              ...this.filter,
              orderReleaseCode: '',
            };
            this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
            this.stateDetail = STATE_ORDER['DA_TRON_XONG'].value;
            this.isExportOrder();
            const result = {orderCode: this.code, state: STATE_ORDER['DA_TRON_XONG'].value};
            this.drawerService.returnData({...data, data: result, event: 'UPDATE_ORDER'});
            this.submitted = false;
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  accumulatedNumber() {
    if (!this.dataDetail?.orderReleases) {
      return 0;
    }
    const orFinish = this.dataDetail?.orderReleases
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
}
