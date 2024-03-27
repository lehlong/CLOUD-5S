import {
  EORDER_EXPORT_STEPS,
  LIST_ORDER_EXPORT,
  ORDER_EXPORT_TYPE,
  PAYMENT_METHODS,
} from './../../../../utils/constant/order-export';
import {Component, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import {ACTION_ORDER, STATE_ORDER} from 'src/app/utils/constant';
import {ExportEditComponent} from '../export-edit/export-edit.component';
import Swal from 'sweetalert2';
import {PrintService} from 'src/app/services/Common/print.service';
import {OrderExportPrintComponent} from 'src/app/@module/print-templates/order-export-print/order-export-print.component';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderExportFilter} from 'src/app/@filter/SO/export.filter';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'app-export-detail',
  templateUrl: './export-detail.component.html',
  styleUrls: ['./export-detail.component.scss'],
})
export class ExportDetailComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  itemDetail: any;
  ACTION_ORDER = ACTION_ORDER;
  STATE_ORDER = STATE_ORDER;
  detailData: any = {};
  code: string = '';
  ORDER_EXPORT_TYPE = ORDER_EXPORT_TYPE;
  widthDeault: string = '0px';
  STATE_ORDER_EXPORT = LIST_ORDER_EXPORT;
  bankAccount: any;
  inComeType: any;
  PAYMENT_METHODS = PAYMENT_METHODS;
  filter = new OrderExportFilter();
  constructor(
    private _oxs: OrderExportService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private _ps: PrintService,
    private viewContainerRef: ViewContainerRef,
    private dropdownService: DropdownService,
    private utils: utils,
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
    this._oxs.GetDetail(this.code).subscribe((res) => {
      this.itemDetail = res.data;
    });
  }

  close() {
    this.filter = {
      ...this.filter,
      orderExport: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  totalMoney() {
    const arrMoney = this.itemDetail.exportDetails.map((item: any) => item.sumMoney);
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
      title: 'Bạn muốn xác nhận phiếu?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._oxs.Confirm(this.itemDetail?.code).subscribe(
          (data) => {
            this.getDetail();
            this.drawerService.returnData(data);
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
        this._oxs.Cancel(this.itemDetail?.code).subscribe(
          (data) => {
            this.getDetail();
            this.drawerService.returnData(data);
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  getSummoney() {
    let sumMoneys = this.itemDetail?.exportDetails.map((item: any) => item?.sumMoney);
    return sumMoneys.reduce((total: number, currentValue: any) => {
      if (!currentValue) {
        currentValue = 0;
      }
      return total + currentValue;
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
    this._ps.printComponent(dataPrint, OrderExportPrintComponent, this.viewContainerRef, 'order-export.css');
  }
}
