import {Component, OnInit} from '@angular/core';
import {AccountFilter, optionsGroup} from 'src/app/@filter/Common/account.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {AccountService} from 'src/app/services/AD/account.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {AccountCreateComponent} from '../account-create/account-create.component';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import Swal from 'sweetalert2';
import {AccountEditComponent} from '../account-edit/account-edit.component';
import {GlobalService} from 'src/app/services/Common/global.service';
import {utils} from 'src/app/utils/utils';
import {ACCOUNT_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.scss'],
})
export class AccountIndexComponent implements OnInit {
  currentTab: number = 1;
  paginationResult!: PaginationResult;
  displayedColumns: string[] = ['index', 'accountGroup', 'userName', 'fullName', 'isActive'];
  filter = new AccountFilter();
  filterGroup = new BaseFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  ACCOUNT_RIGHTS = ACCOUNT_RIGHTS;
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];
  listCompany:any = [];
  constructor(
    private _as: AccountService,
    private _ds: DrawerService,
    private _ags: AccountGroupService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
    private dropdownService: DropdownService
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách tài khoản',
        path: 'system-manage/account',
      },
    ]);
  }
  ngOnInit(): void {
    this.loadInit();
    this.getAllGroup();
  }

  getAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompany = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  exportExcel() {
    return this._as.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-tai-khoan.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  search() {
    this._as.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  getAllGroup() {
    this.dropdownService.GetAllAccountGroup().subscribe({
      next: ({data}) => {
        this.optionsGroup = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  refresh() {
    this.filter = new AccountFilter();
    this.search();
  }

  loadInit() {
    this.getAllCompany();
    this.search();
  }

  updateRights() {
    const userInfo = this.globalService.getUserInfo();
    this._as
      .getRightOfUser({
        username: userInfo?.userName,
      })
      .subscribe(({data}: any) => {
        this.globalService.setRightData(JSON.stringify(data));
      });
  }

  openCreate() {
    this._ds.open(AccountCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(AccountIndexComponent)) {
        this.updateRights();
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this._ds
      .open(AccountEditComponent, {
        userName: item.userName,
        groupId: item.groupId,
        currentTab: this.currentTab,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(AccountIndexComponent)) {
          this.updateRights();
          this.loadInit();
        }
        if (result.type == 'tab') {
          this.currentTab = result.tab;
        }
      });
  }

  deleteItem(item: any) {
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
        this._as.Delete(item).subscribe({
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
