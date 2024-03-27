import {Component, OnInit} from '@angular/core';
import {RfidService} from 'src/app/services/MD/rfid.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {RfidCreateComponent} from '../rfid-create/rfid-create.component';
import {RfidEditComponent} from '../rfid-edit/rfid-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {rfidFilter} from 'src/app/@filter/MD/rfid.filter';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {RfidModel, optionsGroup} from 'src/app/models/MD/rfid.model';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
import {RFID_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-rfid-index',
  templateUrl: './rfid-index.component.html',
  styleUrls: ['./rfid-index.component.scss'],
})
export class RfidIndexComponent {
  constructor(
    private _service: RfidService,
    private drawerService: DrawerService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách thẻ rfid',
        path: 'master-data/rfid',
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
  displayedColumns: string[] = ['index', 'code', 'name', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new rfidFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  RFID_RIGHTS = RFID_RIGHTS;

  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

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
      anchor.download = 'danh-sach-the-RFID.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  openCreate() {
    this.drawerService.open(RfidCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(RfidIndexComponent)) {
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
        vehicleCode: item.vehicleCode,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(RfidEditComponent, {
        code: item.code,
        vehicleCode: item.vehicleCode,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(RfidIndexComponent)) {
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
          const detail = data?.data?.find((item: rfidFilter) => item.code == this.filter.code);
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

  deleteItemType(item: RfidModel) {
    Swal.fire({
      showCloseButton: true,
      title: 'Bạn có chắc chắn muốn xóa dữ liệu?',

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
