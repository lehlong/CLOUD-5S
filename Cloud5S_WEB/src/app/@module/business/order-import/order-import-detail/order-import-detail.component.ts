import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {OrderImportService} from 'src/app/services/Business/order-import-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {CompanyService} from 'src/app/services/Common/company.service';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {utils} from 'src/app/utils/utils';
import {STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {StockImportPrintComponent} from 'src/app/@module/print-templates/stock-import-print/stock-import-print.component';
import {PrintService} from 'src/app/services/Common/print.service';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {STATE_STOCK_CONST} from 'src/app/utils/constant/stock';
import { OrderImportPrintComponent } from 'src/app/@module/print-templates/order-import-print/order-import-print.component';
@Component({
  selector: 'app-order-import-detail',
  templateUrl: './order-import-detail.component.html',
  styleUrls: ['./order-import-detail.component.scss'],
})
export class OrderImportDetailComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  STATE_STOCK: STATE_STOCK_CONST = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  code: string = '';
  state: string = '';
  filter = new StockImportFilter();
  showButton = {
    confirm: true,
    edit: true,
    cancel: true,
  };
  detailData: any = {};
  companyInfo: any = null;
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private printService: PrintService,
    private _service: OrderImportService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
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

  printWarehouseReceipt() {
    this.printService.printComponent(
      {
        detail: this.detailData,
        company: this.companyInfo,
      },
      OrderImportPrintComponent,
      this.viewContainerRef,
      'order-import.css',
    );
  }

  showEdit() {
    this.drawerService.returnData({
      openEdit: true,
      code: this.code,
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetDetail();
    this.GetDetailCompany();
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

  totalMoney() {
    const arrMoney = this.detailData?.importDetails?.map((item: any) => item.price * item.number) || [];
    if(arrMoney.length){
      return (
        arrMoney.reduce((total: number, currentValue: number) => {
          return total + currentValue;
        }) || 0
      );
    }else{
      return 0;
    }
  }

  realPayMoney() {
    const totalMoney = this.totalMoney();
    const tax = this.detailData.taxVat;
    const discount = this.detailData.discount;
    const realPayMoney = totalMoney - (totalMoney * discount) / 100 + (totalMoney * tax) / 100;
    return realPayMoney;
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          //
          this.showButton = {
            confirm: data?.state === STATE_STOCK['KHOI_TAO'].value,
            edit: data?.state == STATE_STOCK['KHOI_TAO'].value,
            cancel: data?.state == STATE_STOCK['KHOI_TAO'].value,
          };
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

  cancelStockImport() {
    Swal.fire({
        showCloseButton: true,
      title: ' Hủy phiếu nhập hàng ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Huỷ đơn',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .Cancel({
            code: this.code,
            // state: this.state,
          })

          .subscribe(
            (data) => {
              this.detailData = {
                ...this.detailData,
                state: this.STATE_STOCK['DA_BI_HUY'].value,
              };

              this.drawerService.returnData(data);

              this.showButton = {
                confirm: false,
                edit: false,
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
  ConfirmState() {
    Swal.fire({
        showCloseButton: true,
      title: 'Xác nhận phiếu nhập hàng ?',
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
            // state: STATE_STOCK['DA_XAC_NHAN'].value,
          })
          .subscribe(
            (data) => {
              this.drawerService.returnData(data);
              this.showButton = {
                confirm: false,
                edit: false,
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
}
