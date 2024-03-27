import {Component, OnInit} from '@angular/core';
import {ItemTypeService} from 'src/app/services/MD/item-type.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ItemTypeCreateComponent} from '../item-type-create/item-type-create.component';
import {ItemTypeEditComponent} from '../item-type-edit/item-type-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ItemTypeFilter} from 'src/app/@filter/MD/item-type.filter';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {ItemTypeModel, optionsGroup} from 'src/app/models/MD/item-type.model';
import {ITEMTYPE_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-item-type-index',
  templateUrl: './item-type-index.component.html',
  styleUrls: ['./item-type-index.component.scss'],
})
export class ItemTypeIndexComponent {
  constructor(
    private _service: ItemTypeService,
    private drawerService: DrawerService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách nhóm sản phẩm',
        path: 'master-data/item-type',
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
  displayedColumns: string[] = ['index', 'code', 'name', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new ItemTypeFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  ITEMTYPE_RIGHTS = ITEMTYPE_RIGHTS;
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
      anchor.download = 'danh-sach-nhom-san-pham.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  openCreate() {
    this.drawerService.open(ItemTypeCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ItemTypeIndexComponent)) {
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
      .open(ItemTypeEditComponent, {
        code: item.code,
        name: item.name,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(ItemTypeIndexComponent)) {
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
          const detail = data?.data?.find((item: ItemTypeFilter) => item.code == this.filter.code);
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

  deleteItemType(item: ItemTypeModel) {
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
