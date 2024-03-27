import {Component} from '@angular/core';
import {BusinessService} from 'src/app/services/AD/business.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {BusinessCreateComponent} from '../business-create/business-create.component';
import {BusinessEditComponent} from '../business-edit/business-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {BusinessFilter, optionsGroup} from 'src/app/@filter/AD/business.filter';
import {BusinessModel} from 'src/app/models/AD/business.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {BUSINESS_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-business-index',
  templateUrl: './business-index.component.html',
  styleUrls: ['./business-index.component.scss'],
})
export class BusinessIndexComponent {
  constructor(
    private _service: BusinessService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách doanh nghiệp',
        path: 'system-manage/business',
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
  displayedColumns: string[] = ['index', 'code', 'name', 'shortName', 'taxCode', 'email', 'phone', 'address', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new BusinessFilter();
  optionsGroup: optionsGroup[] = [];
  faFileExcel = faFileExcel;
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];
  BUSINESS_RIGHTS = BUSINESS_RIGHTS;

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
      anchor.download = 'danh-sach-doanh-nghiep.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(BusinessCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(BusinessIndexComponent)) {
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
        shortName: item.shortName,
        taxCode: item.taxCode,
        email: item.email,
        phone: item.phone,
        address: item.address,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(BusinessEditComponent, {
        code: item.code,
        name: item.name,
        shortName: item.shortName,
        taxCode: item.taxCode,
        email: item.email,
        phone: item.phone,
        address: item.address,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(BusinessIndexComponent)) {
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
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: BusinessFilter) => item.code == this.filter.code);
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

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteArea(item: BusinessModel) {
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
