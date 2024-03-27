import {Component} from '@angular/core';
import {CustomerCareService} from 'src/app/services/Business/customer-care.service';
import {DebounceService} from 'src/app/services/Common/debounce.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {CustomerCareCreateComponent} from '../customer-care-create/customer-care-create.component';
import {CustomerCareEditComponent} from '../customer-care-edit/customer-care-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {CustomerCareEditFilter} from 'src/app/@filter/Business/customer-care.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {DetailOrderComponent} from '../detail-order/detail-order.component';
import {CUSTOMER_SUPPORT_RIGHTS} from 'src/app/utils/constant/index';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-customer-care-index',
  templateUrl: './customer-care-index.component.html',
  styleUrls: ['./customer-care-index.component.scss'],
})
export class CustomerCareIndexComponent {
  constructor(
    private _service: CustomerCareService,
    private debounceService: DebounceService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Chăm sóc khách hàng',
        path: 'business/customer-care',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
      console.log('filter', this.filter);
    });
  }
  dataSource!: any;
  //Khai báo biến
  displayedColumns: string[] = ['index', 'careDate', 'customerName', 'orderCode', 'careContent', 'actions'];
  paginationResult!: PaginationResult;
  filter = new CustomerCareEditFilter();
  faFileExcel = faFileExcel;
  CUSTOMER_SUPPORT_RIGHTS = CUSTOMER_SUPPORT_RIGHTS;
  id: string = '';
  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit(true);
  }

  openCreate() {
    this.drawerService.open(CustomerCareCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(CustomerCareIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.id = item.id;
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        orderCode: item.orderCode,
        id: item.id,
      },
    });
    this.drawerService
      .open(CustomerCareEditComponent, {
        careDate: item.careDate,
        orderCode: item.orderCode,
        careContent: item.careContent,
        id: item.id,
        partnerName: item.partner?.name,
        address: item.partner?.address,
        phoneNumber: item.partner?.phoneNumber,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(CustomerCareIndexComponent)) {
          this.loadInit();
        }
      });
  }

  openDetailOrder(item: any) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        // code: item.orderCode,
      },
    });
    this.drawerService
      .open(DetailOrderComponent, {
        code: item.orderCode,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(CustomerCareIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.id !== '') {
          const detail = data?.data?.find((item: CustomerCareEditFilter) => item.id == this.filter.id);
          console.log(this.filter);
          console.log(detail);
          if (detail && first) {
            this.openEdit(detail);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.search(first);
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

  onChangePartnerCode(PartnerCode: string) {
    this.filter = new CustomerCareEditFilter();
    this.filter = {
      ...this.filter,
      PartnerCode: PartnerCode,
    };
    this.search();
  }
  reload() {
    this.filter = new CustomerCareEditFilter();
    this.search(true);
  }
  enterKeyword(e: any) {
    this.debounceService.debounce(
      'searchCustomerCare',
      () => {
        this.filter.keyWord = e.target?.value;
        this.search();
      },
      400,
    );
  }
  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'cham-soc-khach-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}
