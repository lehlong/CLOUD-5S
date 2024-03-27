import {Component, OnInit} from '@angular/core';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PartnerCreateComponent} from '../partner-create/partner-create.component';
import {PartnerEditComponent} from '../partner-edit/partner-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PartnerFilter, optionsGroup} from 'src/app/@filter/MD/partner.filter';
import Swal from 'sweetalert2';
import {PartnerModel} from 'src/app/models/MD/partner.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PARTNER_RIGHTS} from 'src/app/utils/constant/index';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-partner-index',
  templateUrl: './partner-index.component.html',
  styleUrls: ['./partner-index.component.scss'],
})
export class PartnerIndexComponent implements OnInit {
  constructor(
    private _service: PartnerService,
    private drawerService: DrawerService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách đối tác',
        path: 'master-data/partner',
      },
    ]);
    this.route.queryParams.subscribe((params) => {
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
  displayedColumns: string[] = [
    'index',
    'code',
    'name',
    'taxCode',
    'address',
    'phoneNumber',
    'email',
    'isCustomer',
    'isProvider',
    'isActive',
    'actions',
  ];
  paginationResult!: PaginationResult;
  faFileExcel = faFileExcel;
  filter = new PartnerFilter();
  optionsGroup: optionsGroup[] = [];
  PARTNER_RIGHTS = PARTNER_RIGHTS;
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

  userTypeFilter: any;
  selectItemType(userType: {value: string; label: string}, event: any) {}

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-doi-tac.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(PartnerCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PartnerIndexComponent)) {
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
        code: item.code,
        name: item.name,
        taxCode: item.taxCode,
        isActive: item.isActive,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        isProvider: item.isProvider,
        isCustomer: item.isCustomer,
      },
    });
    this.drawerService
      .open(PartnerEditComponent, {
        code: item.code,
        name: item.name,
        taxCode: item.taxCode,
        isActive: item.isActive,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        isProvider: item.isProvider,
        isCustomer: item.isCustomer,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(PartnerIndexComponent)) {
          this.loadInit();
        }
      });
  }
  search(currentPage: number = 1, pageSize: number | undefined = undefined) {
    this.filter = {
      ...this.filter,
      keyWord: this.filter.keyWord || '',
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
      isActive: '',
      isCustomer: this.userTypeFilter === 'customer' || null,
      isProvider: this.userTypeFilter === 'provider' || null,
    };

    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: PartnerFilter) => item.code == this.filter.code);
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
    this.search(this.filter.currentPage);
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  reload() {
    this.userTypeFilter = '';
    this.filter = new PartnerFilter();
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
  deleteCustomer(item: PartnerModel) {
    Swal.fire({
      showCloseButton: true,
      title: 'Bạn muốn xóa dữ liệu này?',

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
