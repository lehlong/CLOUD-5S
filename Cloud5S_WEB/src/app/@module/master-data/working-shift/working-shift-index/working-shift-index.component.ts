import {Component, OnInit} from '@angular/core';
import {WorkingShiftService} from 'src/app/services/MD/working-shift.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {WorkingShiftCreateComponent} from '../working-shift-create/working-shift-create.component';
import {WorkingShiftEditComponent} from '../working-shift-edit/working-shift-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {WorkingShiftFilter} from 'src/app/@filter/MD/working-shift.filter';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {ItemTypeModel, optionsGroup} from 'src/app/models/MD/item-type.model';
import {WORKINGSHIFT_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-working-shift-index',
  templateUrl: './working-shift-index.component.html',
  styleUrls: ['./working-shift-index.component.scss'],
})
export class WorkingShiftIndexComponent {
  constructor(
    private _service: WorkingShiftService,
    private drawerService: DrawerService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách ca làm việc',
        path: 'master-data/working-shift',
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
      name: 'Đơn vị tính',
      path: '/master-data/unit',
    },
  ];
  displayedColumns: string[] = ['index', 'code', 'name', 'timeStart', 'timeEnd', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new WorkingShiftFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  WORKINGSHIFT_RIGHTS = WORKINGSHIFT_RIGHTS;
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
      anchor.download = 'danh-sach-ca-lam-viec.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  openCreate() {
    this.drawerService.open(WorkingShiftCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(WorkingShiftIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    console.log('meo', item);
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
      .open(WorkingShiftEditComponent, {
        code: item.code,
        name: item.name,
        startTime: item.fromHour,
        endTime: item.toHour,
        description: item.description,
        isActive: item.isActive,
        ordinalNumber: item.ordinalNumber,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(WorkingShiftIndexComponent)) {
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
        console.log('meotest', this.paginationResult);
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: WorkingShiftFilter) => item.code == this.filter.code);
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

  deleteItemType(item: WorkingShiftFilter) {
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
