import {Component, OnInit} from '@angular/core';
import {DeviceTypeService} from 'src/app/services/MD/device-type.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DeviceTypeCreateComponent} from '../device-type-create/device-type-create.component';
import {DeviceTypeEditComponent} from '../device-type-edit/device-type-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DeviceTypeFilter, optionsGroup} from 'src/app/@filter/MD/device-type.filter';
import {DeviceGroupModel} from 'src/app/models/MD/device-group.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {DeviceTypeModel} from 'src/app/models/MD/device-type.model';
import {DEVICETYPE_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-device-type-index',
  templateUrl: './device-type-index.component.html',
  styleUrls: ['./device-type-index.component.scss'],
})
export class DeviceTypeIndexComponent implements OnInit {
  constructor(
    private _service: DeviceTypeService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách loại thiết bị',
        path: 'master-data/device-type',
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
  DEVICETYPE_RIGHTS = DEVICETYPE_RIGHTS;
  //Khai báo biến
  breadcrumbList: any[] = [
    {
      name: 'Trang chủ',
      path: '',
    },
    {
      name: 'Loại thiết bị',
      path: '/master-data/device-type',
    },
  ];
  displayedColumns: string[] = ['index', 'code', 'name', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new DeviceTypeFilter();
  optionsGroup: optionsGroup[] = [];
  faFileExcel = faFileExcel;
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
      anchor.download = 'danh-sach-loai-thiet-bi.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(DeviceTypeCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(DeviceTypeIndexComponent)) {
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
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(DeviceTypeEditComponent, {
        code: item.code,
        name: item.name,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(DeviceTypeIndexComponent)) {
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
        console.log('data: ', data);
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: DeviceTypeFilter) => item.code == this.filter.code);
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
    this.search();
  }

  reload() {
    this.filter = new DeviceTypeFilter();
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.filter.currentPage = 1;
    this.search();
  }

  deleteUnit(item: DeviceTypeModel) {
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
