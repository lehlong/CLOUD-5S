import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {PaymentVoucherService} from 'src/app/services/Business/payment-voucher.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PAYMENT_VOUCHER_RIGHTS, METHOD_NAME, STATE_PAYMENT_VOUCHER} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {PaymentVoucherFilter} from 'src/app/@filter/Business/payment-voucher.filter';
import {utils} from 'src/app/utils/utils';
import {PrintService} from 'src/app/services/Common/print.service';
import {CompanyService} from 'src/app/services/Common/company.service';
import {PaymentVoucherPrintComponent} from 'src/app/@module/print-templates/payment-voucher-print/payment-voucher-print.component';
@Component({
  selector: 'app-payment-voucher-detail',
  templateUrl: './payment-voucher-detail.component.html',
  styleUrls: ['./payment-voucher-detail.component.scss'],
})
export class PaymentVoucherDetailComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  displayedColumns: string[] = ['code', 'importDate', 'partner', 'debt'];
  PAYMENT_VOUCHER_RIGHTS = PAYMENT_VOUCHER_RIGHTS;
  METHOD_NAME: any = METHOD_NAME;
  STATE_PAYMENT_VOUCHER = STATE_PAYMENT_VOUCHER;

  widthDeault: string = '0px';
  code: string = '';
  filter = new PaymentVoucherFilter();
  showButton = {
    confirm: false,
    cancel: false,
    edit: false,
    print: false,
  };
  companyInfo: any = null;
  detailData: any = {};
  dataReceipt: any = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private _service: PaymentVoucherService,
    private drawerService: DrawerService,
    private router: Router,
    private printService: PrintService,
    public utils: utils,
    private route: ActivatedRoute,
    private companyService: CompanyService,
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
    this.loadInit();
  }

  printPaymentVoucher() {
    this.printService.printComponent(
      {
        detail: this.detailData,
        company: this.companyInfo,
      },
      PaymentVoucherPrintComponent,
      this.viewContainerRef,
      'payment-voucher.css',
    );
  }

  GetDetailCompany() {
    this.companyService.GetDetail().subscribe(
      ({data}) => {
        this.companyInfo = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  showEdit() {
    this.drawerService.returnData({
      openEdit: true,
      code: this.code,
    });
  }

  loadInit() {
    this.GetDetail();
    this.GetDetailCompany();
  }

  getTotalReceipt() {
    return this.utils.formatNumber(
      this.dataReceipt.reduce((total: number, element: any) => {
        return total + element?.debt;
      }, 0),
    );
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.showButton = {
            confirm: data?.state == this.STATE_PAYMENT_VOUCHER['KHOI_TAO'].value,
            cancel: data?.state == STATE_PAYMENT_VOUCHER['KHOI_TAO'].value,
            edit: data?.state == STATE_PAYMENT_VOUCHER['KHOI_TAO'].value,
            print: data?.state !== this.STATE_PAYMENT_VOUCHER['DA_BI_HUY'].value,
          };
          this.dataReceipt = data?.payBillImports.map((element: any) => {
            return {
              code: element?.importCode,
              importDate: element?.orderImport?.importDate,
              partner: element?.orderImport?.partner,
              debt: element?.orderImport?.debt,
            };
          });
          this.detailData = data;
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

  ConfirmState() {
    Swal.fire({
        showCloseButton: true,
      title: 'Xác nhận phiếu chi ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .ConfirmState({
            code: this.code,
          })
          .subscribe(
            (data) => {
              this.detailData = {
                ...this.detailData,
                state: this.STATE_PAYMENT_VOUCHER['DA_XAC_NHAN'].value,
              };
              this.drawerService.returnData(data);
              this.showButton = {
                confirm: false,
                cancel: false,
                edit: false,
                print: true,
              };
            },
            (error) => {
              console.log('error: ', error);
            },
          );
      }
    });
  }

  CancelState() {
    Swal.fire({
        showCloseButton: true,
      title: 'Huỷ phiếu chi ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Huỷ phiếu',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .CancelState({
            code: this.code,
          })
          .subscribe(
            (data) => {
              this.detailData = {
                ...this.detailData,
                state: this.STATE_PAYMENT_VOUCHER['DA_BI_HUY'].value,
              };
              this.drawerService.returnData(data);
              this.showButton = {
                confirm: false,
                cancel: false,
                edit: false,
                print: false,
              };
            },
            (error) => {
              console.log('error: ', error);
            },
          );
      }
    });
  }
}
