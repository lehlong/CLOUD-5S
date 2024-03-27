import {Component, OnInit} from '@angular/core';
import {DeviceService} from 'src/app/services/MD/device.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DeviceCreateComponent} from '../device-create/device-create.component';
import {DeviceEditComponent} from '../device-edit/device-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DeviceModel} from 'src/app/models/MD/device.model';
import Swal from 'sweetalert2';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DeviceFilter, optionsGroup} from 'src/app/@filter/MD/device.filter';
import {utils} from 'src/app/utils/utils';
import {GlobalService} from 'src/app/services/Common/global.service';

import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-device-index',
  templateUrl: './device-index.component.html',
  styleUrls: ['./device-index.component.scss'],
})
export class DeviceIndexComponent implements OnInit {
  constructor(
    private _service: DeviceService,
    private drawerService: DrawerService,
    private router: Router,
    private dropdownService: DropdownService,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách thiết bị ',
        path: 'master-data/device',
      },
    ]);
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  listdevicetypeAll: any = [];
  listdevicegroupAll: any = [];
  dataSource!: any;
  faFileExcel = faFileExcel;
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
    'typeCode',
    'groupCode',
    'ipAddress',
    'ipPort',
    'devicePort',
    'username',
    'password',
    'isActive',
    'actions',
  ];
  paginationResult!: PaginationResult;
  filter = new DeviceFilter();
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(DeviceCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(DeviceIndexComponent)) {
        this.loadInit();
      }
    });
  }

  exportExcel() {}
  GetAllDeviceType() {
    this.dropdownService.GetAllDeviceType().subscribe(
      ({data}) => {
        this.listdevicetypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllDevicegroup() {
    this.dropdownService.GetAllDeviceGroup().subscribe(
      ({data}) => {
        this.listdevicegroupAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  openEdit(item: any) {
    console.log(item);

    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
        name: item.name,
        typeCode: item.typeCode,
        groupCode: item.groupCode,
        ipAddress: item.ipAddress,
        ipPort: item.ipPort,
        devicePort: item.devicePort,
        username: item.username,
        password: item.password,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(DeviceEditComponent, {
        code: item.code,
        name: item.name,
        typeCode: item.typeCode,
        groupCode: item.groupCode,
        ipAddress: item.ipAddress,
        ipPort: item.ipPort,
        devicePort: item.devicePort,
        username: item.username,
        password: item.password,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(DeviceIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      typeCode: this.filter.typeCode,
      groupCode: this.filter.groupCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        console.log('data: ', data);
        this.paginationResult = data;

        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: DeviceFilter) => item.code == this.filter.code);
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
    //them vao
    this.search(first);
    this.GetAllDeviceType();
    this.GetAllDevicegroup();
  }

  reload() {
    this.filter = new DeviceFilter();
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

  deleteDevice(item: DeviceModel) {
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
