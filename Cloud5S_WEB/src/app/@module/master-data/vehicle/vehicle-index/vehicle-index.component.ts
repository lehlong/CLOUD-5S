import {Component, OnInit} from '@angular/core';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {VehicleCreateComponent} from '../vehicle-create/vehicle-create.component';
import {VehicleEditComponent} from '../vehicle-edit/vehicle-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {VehicleFilter, AccountGetAllFilter} from 'src/app/@filter/MD/vehicle.filter';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {VehicleModel} from 'src/app/models/MD/vehicle.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {VEHICLE_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-vehicle-index',
  templateUrl: './vehicle-index.component.html',
  styleUrls: ['./vehicle-index.component.scss'],
})
export class VehicleIndexComponent {
  constructor(
    private _service: VehicleService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách phương tiện',
        path: 'master-data/vehicle',
      },
    ]);
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  listVehicletypeAll: any = [];

  //Khai báo biến
  displayedColumns: string[] = [
    'index',
    'name',
    'code',
    'defaultDriver',
    'tonnage',
    'unladenWeight',
    'unitCode',
    'isActive',
    'actions',
  ];
  paginationResult!: PaginationResult;
  filter = new VehicleFilter();
  faFileExcel = faFileExcel;
  VEHICLE_RIGHTS = VEHICLE_RIGHTS;

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
      anchor.download = 'danh-sach-phuong-tien.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(VehicleCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(VehicleIndexComponent)) {
        this.loadInit();
      }
    });
  }

  GetAllVehicletype() {
    this.dropdownService.GetAllVehicletype().subscribe(
      ({data}) => {
        this.listVehicletypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  openEdit(item: any) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
        name: item.name,
        unitCode: item.unitCode,
      },
    });
    this.drawerService
      .open(VehicleEditComponent, {
        code: item.code,
        unitCode: item.unitCode,
        tonnage: item.tonnage,
        unladenWeight: item.unladenWeight,
        typeCode: item.typeCode,
        isActive: item.isActive,
        driverUserName: item.driverUserName,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(VehicleIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    const filterFormat = {
      ...this.filter,
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      typeCode: this.filter.typeCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: VehicleFilter) => item.code == this.filter.code);
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
    this.GetAllVehicletype();
  }

  reload() {
    this.filter = new VehicleFilter();

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

  deleteVehicle(item: VehicleModel) {
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
