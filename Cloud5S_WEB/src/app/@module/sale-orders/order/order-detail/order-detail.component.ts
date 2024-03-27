import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {
  STATE_ORDER,
  ACTION_ORDER,
  STATE_ORDER_PAY,
  STATE_ORDER_NEW,
  ACTION_ORDER_NEW,
  ORDER_RIGHTS,
} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import {utils} from 'src/app/utils/utils';
import {
  EORDER_EXPORT_STEPS,
  LIST_ORDER_EXPORT,
  ORDER_EXPORT_TYPE,
  PAYMENT_METHODS,
} from 'src/app/utils/constant/order-export';
import {OrderExportFilter} from 'src/app/@filter/SO/export.filter';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import {PrintService} from 'src/app/services/Common/print.service';
import {OrderExportPrintComponent} from 'src/app/@module/print-templates/order-export-print/order-export-print.component';
import {OrderPrintComponent} from 'src/app/@module/print-templates/order-print/order-print.component';
import {EPURCHASING_METHOD, PURCHASING_METHOD} from 'src/app/utils/constant/order';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  itemDetail: any;
  ACTION_ORDER = ACTION_ORDER;
  STATE_ORDER = STATE_ORDER;
  detailData: any = {};
  STATE_ORDER_NEW = STATE_ORDER_NEW;
  STATE_ORDER_PAY = STATE_ORDER_PAY;
  code: string = '';
  ORDER_EXPORT_TYPE = ORDER_EXPORT_TYPE;
  ACTION_ORDER_NEW = ACTION_ORDER_NEW;
  widthDeault: string = '0px';
  STATE_ORDER_EXPORT = LIST_ORDER_EXPORT;
  bankAccount: any;
  inComeType: any;
  PAYMENT_METHODS = PAYMENT_METHODS;
  filter = new OrderFilter();
  PURCHASING_METHOD = PURCHASING_METHOD;
  EPURCHASING_METHOD = EPURCHASING_METHOD;
  showButton = {
    confirm: false,
    cancel: false,
  };
  isPaid: string = '';
  ORDER_RIGHTS = ORDER_RIGHTS;

  constructor(
    private _service: OrderService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private _ps: PrintService,
    private viewContainerRef: ViewContainerRef,
    private dropdownService: DropdownService,
    public utils: utils,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail() {
    this._service.GetDetail({code: this.code}).subscribe((res) => {
      this.itemDetail = res.data;
      this.isPaid = this.itemDetail?.isPaid ? 'DA_THANH_TOAN' : 'CHUA_THANH_TOAN';
      console.log('this.isPaid', this.isPaid);

      this.showButton = {
        confirm:
          this.itemDetail?.state == 'CAN_LAN_2' &&
          (this.itemDetail?.isPaid == false || this.itemDetail?.isPaid == null),
        cancel: this.itemDetail?.isPaid == true,
      };
    });
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  totalMoney() {
    const arrMoney = this.itemDetail.orderDetails.map((item: any) => item?.sumMoney || 0);
    return (
      arrMoney.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      }) || 0
    );
  }

  onUpdate() {
    this.drawerService.returnData({
      openEdit: true,
      item: this.itemDetail,
    });
  }

  onConfirm() {
    Swal.fire({
      showCloseButton: true,
      title: 'Bạn muốn xác nhận thanh toán?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.ConfirmPay({code: this.itemDetail?.code}).subscribe(
          (data) => {
            this.getDetail();
            this.drawerService.returnData(data);
            this.showButton = {
              confirm: false,
              cancel: true,
            };
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  onCancel() {
    Swal.fire({
      showCloseButton: true,
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.CancelPay({code: this.itemDetail?.code}).subscribe(
          (data) => {
            this.getDetail();
            this.drawerService.returnData(data);
            this.showButton = {
              confirm: false,
              cancel: false,
            };
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  isDisableButton() {
    return (
      this.itemDetail?.state == EORDER_EXPORT_STEPS.DA_XAC_NHAN ||
      this.itemDetail?.state == EORDER_EXPORT_STEPS.DA_BI_HUY
    );
  }

  onPrint() {
    const dataPrint = {...this.itemDetail};
    this._ps.printComponent(dataPrint, OrderPrintComponent, this.viewContainerRef, 'order-export.css');
  }
}
