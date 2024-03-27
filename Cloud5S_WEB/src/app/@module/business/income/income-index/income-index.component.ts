import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {IncomeCreateComponent} from '../income-create/income-create.component';
import {IncomeDetailComponent} from '../income-detail/income-detail.component';
import {IncomeEditComponent} from '../income-edit/income-edit.component';
import {utils} from 'src/app/utils/utils';
import * as moment from 'moment';
import {PAYMENT_INCOME_RIGHTS} from 'src/app/utils/constant';
import {IncomeFilter} from 'src/app/@filter/Business/income.filter';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PAYMENT_METHOD, METHOD_NAME, STATE_PAYMENT_INCOME} from 'src/app/utils/constant/payment-method';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {IncomeService} from 'src/app/services/Business/income.service';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-income-index',
  templateUrl: './income-index.component.html',
  styleUrls: ['./income-index.component.scss'],
})
export class IncomeIndexComponent {
  PAYMENT_INCOME_RIGHTS = PAYMENT_INCOME_RIGHTS;
  STATE_PAYMENT_INCOME = STATE_PAYMENT_INCOME;
  filter = new IncomeFilter();
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  listContentFilter: any = [];
  listContentAll: any = [];
  contentSelected = {
    code: '',
    name: '',
  };
  partnerSelected = {
    code: '',
    name: '',
  };
  METHOD_NAME: any = METHOD_NAME;
  PAYMENT_METHOD = PAYMENT_METHOD;
  listPartnerAll: any = [];
  listPartnerFilter: any = [];
  paginationResult!: PaginationResult;
  displayedColumns: string[] = [
    'index',
    'paymentDate',
    'code',
    'type',
    'reason',
    'paymentMethod',
    'senderName',
    'partner',
    'money',
    'createBy',
    'createDate',
    'state',
  ];

  constructor(
    private _service: IncomeService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Phiếu thu tiền',
        path: 'business/income',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  openCreate() {
    this.drawerService.open(IncomeCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(IncomeIndexComponent)) {
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
      .open(IncomeDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(IncomeIndexComponent)) {
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
      .open(IncomeEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(IncomeIndexComponent)) {
          this.loadInit();
        }
      });
  }
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  ngOnInit(): void {
    this.loadInit(true);
  }

  reload() {
    this.filter = new IncomeFilter();
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

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      PaymentMethod: this.filter.paymentMethod,
      IncomeType: this.filter.incomeType,
      PartnerCode: this.filter.partnerCode,
    };
    this._service.search(filterFormat, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: IncomeFilter) => item.code == this.filter.code);
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

  selectContent(item: any, event: any) {
    if (event.isUserInput) {
      this.contentSelected.name = item.name;
      this.contentSelected.code = item.code;
    }
  }

  selectPartner(item: any, event: any) {
    if (event.isUserInput) {
      this.partnerSelected.code = item.code;
      this.partnerSelected.name = item.name;
    }
  }

  GetAllContent() {
    this.dropdownService.GetAllIncomeType().subscribe(
      ({data}) => {
        this.listContentAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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

  loadInit(first: boolean = false) {
    this.GetAllContent();
    this.GetAllPartner();
    this.search(first);
  }
}
