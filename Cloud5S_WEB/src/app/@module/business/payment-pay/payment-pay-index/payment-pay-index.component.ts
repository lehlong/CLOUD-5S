import {Component} from '@angular/core';
import {PaymentPayService} from 'src/app/services/Business/payment-pay.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {GlobalService} from 'src/app/services/Common/global.service';
import {PaymentPayIndexFilter, PaymentPayIndexSearchFilter} from 'src/app/@filter/Business/payment-pay.filter';
import {PaymentPayDetailComponent} from '../payment-pay-detail/payment-pay-detail.component';

@Component({
  selector: 'app-payment-pay-index',
  templateUrl: './payment-pay-index.component.html',
  styleUrls: ['./payment-pay-index.component.scss'],
})
export class PaymentPayIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  listPartnerAll: any = [];
  listItemAll: any = [];
  faFileExcel = faFileExcel;

  listItemFilter: any = [];

  selectedStates: any = [];

  displayedColumns: string[] = [
    'index',
    'partnerCode',
    'partnerName',
    'phoneNumber',
    'address',
    'firstPeriod',
    'inPeriod',
    'payInPeriod',
    'lastPeriod',
  ];

  paginationResult!: PaginationResult;
  state_order = STATE_ORDER;
  list_state = LIST_STATE;
  filter = new PaymentPayIndexFilter();

  constructor(
    private _service: PaymentPayService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách công nợ cần chi',
        path: 'business/payment-pay',
      },
    ]);

    this.route.queryParams.subscribe((params: any) => {
      // this.filter = {
      //   ...this.filter,
      //   ...params,
      // };
      // this.filter.selectedRange = [moment().startOf('month').toDate(), moment().startOf('day').toDate()];
      if (params?.States !== '') {
        this.selectedStates = this.list_state.filter((item: any) => {
          return params?.States?.includes(item.value);
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  openDetail(row: any) {
    this.drawerService.open(PaymentPayDetailComponent, {
      data: {
        ...row,
        FromDate: moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') || '',
        ToDate: moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') || '',
      },
    });
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner({isProvider: true}).subscribe(
      ({data}) => {
        this.listPartnerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
        this.listItemFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  search(first: boolean = false) {
    const filterFormat: PaymentPayIndexSearchFilter = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : null,
      ToDate:
        this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : null,
      PartnerCode: this.filter.PartnerCode,
      IsAll: this.filter.isAll,
    };
    if (this.filter?.selectedRange?.length === 0) {
      delete filterFormat.FromDate;
      delete filterFormat.ToDate;
    }
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetAllItem();
    this.search(first);
  }

  reload() {
    this.selectedStates = [];
    this.filter = new PaymentPayIndexFilter();
    this.search();
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
  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : null,
      ToDate:
        this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : null,
      PartnerCode: this.filter.PartnerCode,
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-cong-no-can-chi.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  checkSelect() {}
  selectCheck($event: any) {}
}
