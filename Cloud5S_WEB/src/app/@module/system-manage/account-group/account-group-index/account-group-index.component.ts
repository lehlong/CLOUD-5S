import {Component, OnInit} from '@angular/core';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {AccountGroupCreateComponent} from '../account-group-create/account-group-create.component';
import {AccountGroupEditComponent} from '../account-group-edit/account-group-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {AccountGroupFilter} from 'src/app/@filter/AD/account-group.filter';
import {AccountGroupModel} from 'src/app/models/AD/account-group.model';
import Swal from 'sweetalert2';
import {utils} from 'src/app/utils/utils';
import {AccountService} from 'src/app/services/AD/account.service';
import {GlobalService} from 'src/app/services/Common/global.service';
import {ACCOUNTGROUP_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-account-group-index',
  templateUrl: './account-group-index.component.html',
  styleUrls: ['./account-group-index.component.scss'],
})
export class AccountGroupIndexComponent implements OnInit {
  currentTab: number = 1;
  constructor(
    private _service: AccountGroupService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private accountService: AccountService,
    private globalService: GlobalService,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  //Khai báo biến
  breadcrumbList: any[] = [
    {
      name: 'Trang chủ',
      path: '',
    },
    {
      name: 'Đơn vị tính',
      path: '/master-data/unit',
    },
  ];
  displayedColumns: string[] = ['index', 'name', 'notes', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  faFileExcel = faFileExcel;
  filter = new AccountGroupFilter();
  ACCOUNTGROUP_RIGHTS = ACCOUNTGROUP_RIGHTS;

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-nhom-tai-khoan.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  updateRights() {
    const userInfo = this.globalService.getUserInfo();
    this.accountService
      .getRightOfUser({
        username: userInfo?.userName,
      })
      .subscribe(({data}: any) => {
        this.globalService.setRightData(JSON.stringify(data));
      });
  }

  openCreate() {
    this.drawerService.open(AccountGroupCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(AccountGroupIndexComponent)) {
        this.updateRights();
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.drawerService
      .open(AccountGroupEditComponent, {
        ...item,
        currentTab: this.currentTab,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(AccountGroupIndexComponent)) {
          this.updateRights();
          this.loadInit();
        }

        if (result.type == 'tab') {
          this.currentTab = result.tab;
        }
      });
  }

  search() {
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.id !== '') {
          const detail = data?.data?.find((item: AccountGroupFilter) => item.id == this.filter.id);
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

  reload() {
    this.filter = new AccountGroupFilter();
    this.search();
  }

  deleteAccountGroup(item: AccountGroupModel) {
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
        this._service.Delete(item).subscribe({
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
