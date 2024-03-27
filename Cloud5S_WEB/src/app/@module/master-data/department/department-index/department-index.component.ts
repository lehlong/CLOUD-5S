import {Component, OnInit} from '@angular/core';
import {DepartmentService} from 'src/app/services/MD/department.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DepartmentCreateComponent} from '../department-create/department-create.component';
import {DepartmentEditComponent} from '../department-edit/department-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DepartmentFilter, optionsGroup} from 'src/app/@filter/MD/department.filter';
import {DepartmentModel} from 'src/app/models/MD/department.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {DEPARTMENT_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-department-index',
  templateUrl: './department-index.component.html',
  styleUrls: ['./department-index.component.scss'],
})
export class DepartmentIndexComponent {
  constructor(
    private _service: DepartmentService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách phòng ban',
        path: 'master-data/department',
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
  displayedColumns: string[] = ['index', 'code', 'name', 'companyCode', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new DepartmentFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  DEPARTMENT_RIGHTS = DEPARTMENT_RIGHTS;
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
      anchor.download = 'danh-sach-phong-ban.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(DepartmentCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(DepartmentIndexComponent)) {
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
        companyCode: item.companyCode,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(DepartmentEditComponent, {
        code: item.code,
        name: item.name,
        companyCode: item.companyCode,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(DepartmentIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      isActive: '',
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: DepartmentFilter) => item.code == this.filter.code);
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
  reload() {
    this.filter = new DepartmentFilter();
    this.search();
  }

  deleteDepartment(item: DepartmentModel) {
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
