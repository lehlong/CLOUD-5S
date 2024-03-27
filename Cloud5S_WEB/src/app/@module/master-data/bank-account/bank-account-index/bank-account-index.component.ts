import {Component, OnInit} from '@angular/core';
import {BankAccountService} from 'src/app/services/MD/bank-account.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {BankAccountCreateComponent} from '../bank-account-create/bank-account-create.component';
import {BankAccountEditComponent} from '../bank-account-edit/bank-account-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {BankAccountFilter, optionsGroup} from 'src/app/@filter/MD/bank-account.filter';
import {BankAccountModel} from 'src/app/models/MD/bank-account.model';
import Swal from 'sweetalert2';
import {BANKACCOUNT_RIGHTS} from 'src/app/utils/constant/index';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-bank-account-index',
  templateUrl: './bank-account-index.component.html',
  styleUrls: ['./bank-account-index.component.scss'],
})
export class BankAccountIndexComponent {
  constructor(
    private _service: BankAccountService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách tài khoản ngân hàng',
        path: 'master-data/bank-account',
      },
    ]);
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }
  dataSource!: any;
  //Khai báo biến
  breadcrumbList: any[] = [
    {
      name: 'Trang chủ',
      path: '',
    },
    {
      name: 'Tài khoản ngân hàng',
      path: '/master-data/bank-account',
    },
  ];
  displayedColumns: string[] = ['index', 'name', 'bankAccount', 'ownerName', 'bankName', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  faFileExcel = faFileExcel;
  filter = new BankAccountFilter();
  BANKACCOUNT_RIGHTS = BANKACCOUNT_RIGHTS;
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-tai-khoan-ngan-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  openCreate() {
    this.drawerService.open(BankAccountCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(BankAccountIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        id: item.id,
        name: item.name,
        bankAccount: item.bankAccount,
        ownerName: item.ownerName,
        bankName: item.bankName,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(BankAccountEditComponent, {
        id: item.id,
        name: item.name,
        bankAccount: item.bankAccount,
        ownerName: item.ownerName,
        bankName: item.bankName,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(BankAccountIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
      isActive: '',
    };
    this._service.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.id !== '') {
          const detail = data?.data?.find((item: BankAccountFilter) => item.id == this.filter.id);
          if (detail) {
            this.openEdit(detail);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    //them vao
    this.search(this.filter.currentPage);
  }

  reload() {
    this.filter = new BankAccountFilter();
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteBA(item: BankAccountModel) {
    Swal.fire({
        showCloseButton: true,
      title: 'Bạn muốn xóa dữ liệu này?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.Delete(item, true).subscribe({
          next: ({data}) => {
            this.loadInit();
          },
          error: (response) => {
            console.log(response);
          },
        });
      }
    });
  }
}
