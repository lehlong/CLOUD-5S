import {Component} from '@angular/core';
import {PaymentVoucherService} from 'src/app/services/Business/payment-voucher.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaymentVoucherCreateComponent} from '../payment-voucher-create/payment-voucher-create.component';
import {PaymentVoucherDetailComponent} from '../payment-voucher-detail/payment-voucher-detail.component';
import {PaymentVoucherEditComponent} from '../payment-voucher-edit/payment-voucher-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PaymentVoucherFilter} from 'src/app/@filter/Business/payment-voucher.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PAYMENT_METHOD, PAYMENT_VOUCHER_RIGHTS, METHOD_NAME, STATE_PAYMENT_VOUCHER} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-payment-voucher-index',
  templateUrl: './payment-voucher-index.component.html',
  styleUrls: ['./payment-voucher-index.component.scss'],
})
export class PaymentVoucherIndexComponent {
  maxTagCount = 1;
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };

  listPartnerAll: any = [];
  listPayTypeAll: any = [];

  displayedColumns: string[] = [
    'index',
    'paymentDate',
    'code',
    // 'code2',
    'payType',
    'reason',
    'paymentMethod',
    'receiverName',
    'partner',
    'money',
    'creator',
    'createDate',
    'state'
  ];
  paginationResult!: PaginationResult;
  filter = new PaymentVoucherFilter();

  METHOD_NAME:any = METHOD_NAME;
  PAYMENT_METHOD = PAYMENT_METHOD;
  PAYMENT_VOUCHER_RIGHTS = PAYMENT_VOUCHER_RIGHTS;
  STATE_PAYMENT_VOUCHER = STATE_PAYMENT_VOUCHER;

  constructor(
    private _service: PaymentVoucherService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Phiếu chi tiền',
        path: 'business/payment-voucher',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  ngOnInit(): void {
    this.loadInit(true);
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

  GetAllPayType() {
    this.dropdownService.GetAllPayType().subscribe(
      ({data}) => {
        this.listPayTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  openCreate() {
    this.drawerService.open(PaymentVoucherCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PaymentVoucherIndexComponent)) {
        if (result?.create) {
          this.openDetail(result?.data?.code);
        }
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
      .open(PaymentVoucherDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(PaymentVoucherIndexComponent)) {
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
      .open(PaymentVoucherEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(PaymentVoucherIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      PartnerCode: this.filter.PartnerCode,
      PayType: this.filter.PayType,
      PaymentMethod: this.filter.PaymentMethod,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: PaymentVoucherFilter) => item.code == this.filter.code);
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
    this.GetAllPayType();
    this.search(first);
  }

  reload() {
    this.filter = new PaymentVoucherFilter();
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
}
