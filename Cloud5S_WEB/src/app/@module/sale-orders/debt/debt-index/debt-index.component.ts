import {Component} from '@angular/core';
import {DebtService} from 'src/app/services/SO/debt.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DebtEditComponent} from '../debt-detail/debt-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DebtFilter} from 'src/app/@filter/SO/debt.filter';
import {DebtModel, debtDetails} from 'src/app/models/SO/debt.model';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_DEBT, LIST_STATE_DEBT} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {DEBT_RIGHTS} from 'src/app/utils/constant/access-right';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-debt-index',
  templateUrl: './debt-index.component.html',
  styleUrls: ['./debt-index.component.scss'],
})
export class DebtIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  listPartnerAll: any = [];
  listItemAll: any = [];

  displayedColumns: string[] = [
    'index',
    'code',
    'createDate',
    'pourDate',
    'pourLocation',
    'itemName',
    'orderNumber',
    'partnerName',
    'phoneNumber',
    'state',
  ];
  paginationResult!: PaginationResult;
  state_debt = STATE_DEBT;
  list_state = LIST_STATE_DEBT;
  filter = new DebtFilter();
  DEBT_RIGHTS = DEBT_RIGHTS;

  constructor(
    private _service: DebtService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Chốt sản lượng',
        path: 'sale-orders/debt',
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

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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
      .open(DebtEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(DebtIndexComponent)) {
          this.loadInit();
        }
      });
  }

  onSelectionChange(e: any) {
    const checkStates = this.filter.States?.filter((item: string) => item !== '');
    if (checkStates && checkStates?.length > 0) {
      this.filter = {
        ...this.filter,
        States: this.filter.States?.filter((item: string) => item !== ''),
      };
    }
  }

  search(first: boolean = false) {
    let filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      States: this.filter.States,
    };
    if ('States' in filterFormat && filterFormat.States?.length == 0) {
      filterFormat = {
        ...filterFormat,
        States: [STATE_DEBT['DA_TRON_XONG']?.value, STATE_DEBT['DA_HOAN_THANH']?.value],
      };
    }
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data?.data.map((item: DebtModel) => {
            const debtMain = item?.orderDetails?.find((element: debtDetails) => element?.isMainItem);
            return {
              ...item,
              itemName: debtMain?.item?.name || '',
              orderNumber: debtMain?.orderNumber || 0,
              partnerName: item?.partner?.name || '',
              phoneNumber: item?.partner?.phoneNumber || '',
            };
          }),
        };
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          if (first) {
            this.openEdit(this.filter.code);
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
    this.GetAllItem();
    this.search(first);
  }

  reload() {
    this.filter = new DebtFilter();
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
