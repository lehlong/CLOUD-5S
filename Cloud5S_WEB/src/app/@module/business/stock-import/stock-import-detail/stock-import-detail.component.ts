import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {StockImportService} from 'src/app/services/Business/stock-import.service';
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
@Component({
  selector: 'app-stock-import-detail',
  templateUrl: './stock-import-detail.component.html',
  styleUrls: ['./stock-import-detail.component.scss'],
})
export class StockImportDetailComponent {
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
    private _service: StockImportService,
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
      StockImportPrintComponent,
      this.viewContainerRef,
      'stock-import.css',
    );
  }

  createImportDetails(params: any = null): FormGroup {
    return this._fb.group({
      itemCode: [params?.itemCode || '', Validators.required],
      stockCode: [params?.stockCode || '', Validators.required],
      amount: [params?.amount || '', Validators.required],
      note: params?.note || '',
    });
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

  getTotalMoney(detailData: any) {
    if (!detailData || !detailData.importDetails || !Array.isArray(detailData.importDetails)) {
      return 0;
    }
    const totalImportValue = detailData.importDetails.reduce((accumulator: any, currentProduct: any) => {
      const amount = currentProduct?.amount || 0;
      const price = currentProduct?.price || 0;
      return accumulator + amount * price;
    }, 0);

    return this.utils.formatNumber(totalImportValue);
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;

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
      title: ' Hủy phiếu nhập kho ?',
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
            state: this.state,
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
      title: 'Xác nhận phiếu nhập kho ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .ConfirmState(
            {
              code: this.code,
              state: STATE_STOCK['DA_XAC_NHAN'].value,
            },
            )
          .subscribe(
            (data) => {
              this.detailData = {
                ...this.detailData,
                state: this.STATE_STOCK['DA_XAC_NHAN'].value,
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
}
