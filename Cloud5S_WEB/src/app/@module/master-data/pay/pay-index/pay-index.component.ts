import {Component, OnInit} from '@angular/core';
import {PayTypeService} from 'src/app/services/MD/pay-type.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PayCreateComponent} from '../pay-create/pay-create.component';
import {PayEditComponent} from '../pay-edit/pay-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PayFilter, optionsGroup} from 'src/app/@filter/MD/pay.filter';
import {PayModel} from 'src/app/models/MD/pay.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {PAYTYPE_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-pay-index',
  templateUrl: './pay-index.component.html',
  styleUrls: ['./pay-index.component.scss'],
})
export class PayIndexComponent {
  constructor(
    private _service: PayTypeService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách nội dung chi',
        path: 'master-data/pay',
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
      name: 'nội dung chi',
      path: '/master-data/pay-type',
    },
  ];
  displayedColumns: string[] = ['index', 'name', 'note', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new PayFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  PAYTYPE_RIGHTS = PAYTYPE_RIGHTS;
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
      anchor.download = 'danh-sach-noi-dung-chi.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(PayCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PayIndexComponent)) {
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
        id: item.id,
        name: item.name,
        note: item.note,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(PayEditComponent, {
        id: item.id,
        name: item.name,
        note: item.note,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(PayIndexComponent)) {
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
    this._service.search(this.filter, true).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.id !== '') {
          const detail = data?.data?.find((item: PayFilter) => item.id == this.filter.id);
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
    this.search(this.filter.currentPage);
  }

  reload() {
    this.filter = new PayFilter();
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteUnit(item: PayModel) {
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
        this._service.Delete(item, true).subscribe({
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
