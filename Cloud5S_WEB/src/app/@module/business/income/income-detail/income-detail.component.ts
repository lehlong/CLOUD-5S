import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {PAYMENT_INCOME_RIGHTS} from 'src/app/utils/constant/index';
import {METHOD_NAME, STATE_PAYMENT_INCOME} from 'src/app/utils/constant/payment-method';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {IncomeService} from 'src/app/services/Business/income.service';
import {IncomeFilter} from 'src/app/@filter/Business/income.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {PrintService} from 'src/app/services/Common/print.service';
import {CompanyService} from 'src/app/services/Common/company.service';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import {PaymentIncomePrintComponent} from 'src/app/@module/print-templates/payment-income-print/payment-income-print.component';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss'],
})
export class IncomeDetailComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  displayedColumns: string[] = ['code', 'exportDate', 'partner', 'debt'];

  PAYMENT_INCOME_RIGHTS = PAYMENT_INCOME_RIGHTS;
  METHOD_NAME: any = METHOD_NAME;
  STATE_PAYMENT_INCOME = STATE_PAYMENT_INCOME;

  widthDeault: string = '0px';
  code: string = '';
  filter = new IncomeFilter();
  showButton = {
    confirm: false,
    cancel: false,
    edit: false,
    print: false,
  };
  companyInfo: any = null;
  detailData: any = {};
  dataExport: any = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private _service: IncomeService,
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

  printPaymentIncome() {
    this.printService.printComponent(
      {
        detail: this.detailData,
        company: this.companyInfo,
      },
      PaymentIncomePrintComponent,
      this.viewContainerRef,
      'payment-income.css',
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

  getTotalExport() {
    return this.utils.formatNumber(
      this.dataExport.reduce((total: number, element: any) => {
        return total + element?.debt;
      }, 0),
    );
  }

  loadInit() {
    this.GetDetail();
    this.GetDetailCompany();
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.showButton = {
            confirm: data?.state === STATE_PAYMENT_INCOME['KHOI_TAO'].value,
            cancel: data?.state == STATE_PAYMENT_INCOME['KHOI_TAO'].value,
            edit: data?.state == STATE_PAYMENT_INCOME['KHOI_TAO'].value,
            print:
              data?.state === STATE_PAYMENT_INCOME['KHOI_TAO'].value ||
              data?.state === STATE_PAYMENT_INCOME['DA_XAC_NHAN'].value,
          };
          this.dataExport = data?.incomeBillExports.map((element: any) => {
            return {
              code: element?.exportCode,
              exportDate: element?.orderExport?.exportDate,
              partner: element?.orderExport?.partner,
              debt: element?.orderExport?.debt,
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
      title: 'Xác nhận phiếu thu ?',
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
                state: this.STATE_PAYMENT_INCOME['DA_XAC_NHAN'].value,
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
      title: 'Huỷ phiếu thu ?',
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
                state: this.STATE_PAYMENT_INCOME['DA_BI_HUY'].value,
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
