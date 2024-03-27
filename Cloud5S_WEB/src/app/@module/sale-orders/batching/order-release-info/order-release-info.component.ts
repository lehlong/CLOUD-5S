import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {OrderReleaseService} from 'src/app/services/SO/order-release.service';
import {EORDER_RELEASE_STEPS, LIST_ORDER_RELEASE} from 'src/app/utils/constant/orderRelease';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import {OrderReleaseEditComponent} from '../order-release-edit/order-release-edit.component';
import {STATE_ORDER} from 'src/app/utils/constant';
import {PrintService} from 'src/app/services/Common/print.service';
import {OrderReleasePrintComponent} from 'src/app/@module/print-templates/order-release-print/order-release-print.component';
import {ORDER_RELEASE_RIGHTS} from 'src/app/utils/constant/access-right';
import {OrderReleaseFilter} from 'src/app/@filter/SO/order-release.filter';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from 'src/app/services/SO/order.service';

@Component({
  selector: 'app-order-release-info',
  templateUrl: './order-release-info.component.html',
  styleUrls: ['./order-release-info.component.scss'],
})
export class OrderReleaseInfoComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '1344px';
  orderCode: string = '';
  itemDetail: any;
  orderDetail: any;
  itemMain: any;
  itemSub: any;
  state_orderRelease = LIST_ORDER_RELEASE;
  state_order = STATE_ORDER;
  ORDER_RELEASE_RIGHTS = ORDER_RELEASE_RIGHTS;
  filter = new OrderReleaseFilter();
  constructor(
    private _ors: OrderReleaseService,
    private _os: OrderService,
    private _ps: PrintService,
    private utils: utils,
    private drawerService: DrawerService,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }

  ngOnInit() {
    this.getDetail(this.orderCode);
  }

  getDetail(code: string) {
    this._ors.GetDetail(code).subscribe(
      ({data}) => {
        this.itemDetail = data;
        this.getOrderDetail(data?.orderCode);
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getOrderDetail(orderCode: string) {
    this._os.GetDetail({code: orderCode}).subscribe((res) => {
      this.orderDetail = res.data;
      this.itemMain = res.data?.orderDetails?.find((item: any) => item.isMainItem);
      this.itemSub = res.data?.orderDetails?.find((item: any) => !item.isMainItem);
    });
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      orderReleaseCode: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  accumulatedNumber() {
    if (!this.orderDetail?.orderReleases) {
      return 0;
    }
    const orFinish = this.orderDetail?.orderReleases
      .filter((i: any) => i?.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH)
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

  isDisableButton() {
    return (
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH ||
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_GIAO_HANG ||
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_BI_HUY ||
      this.itemDetail?.state === null
    );
  }

  canPrint() {
    return this.itemDetail?.state != EORDER_RELEASE_STEPS.DA_BI_HUY;
  }

  openEditOR() {
    this.drawerService.returnData({
      openEdit: true,
      item: this.itemDetail,
      orderDetail: this.orderDetail,
    });
  }

  onFinish() {
    Swal.fire({
        showCloseButton: true,
      title: 'Bạn muốn xác nhận phiếu hoàn thành?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._ors.MixedState(this.itemDetail?.code).subscribe(
          (data) => {
            let orderRelease = {...this.itemDetail, state: EORDER_RELEASE_STEPS.DA_HOAN_THANH};
            let orderCode = this.orderDetail.code;
            this.drawerService.returnData({
              ...data,
              orderRelease,
              orderCode,
              event: 'UPDATE_ORDER_RELEASE',
            });
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
      title: 'Bạn muốn xác nhận hủy phiếu?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._ors.CancelStep(this.itemDetail?.code).subscribe(
          (data) => {
            let orderRelease = {...this.itemDetail, state: EORDER_RELEASE_STEPS.DA_BI_HUY};
            let orderCode = this.orderDetail.code;
            this.drawerService.returnData({
              ...data,
              orderRelease,
              orderCode,
              event: 'UPDATE_ORDER_RELEASE',
            });
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  printWarehouseReceipt() {
    const dataPrint = {...this.itemDetail, orderDetail: this.orderDetail, accumulated: this.accumulatedNumber()};
    this._ps.printComponent(dataPrint, OrderReleasePrintComponent, this.viewContainerRef, 'order-release.css');
  }
}
