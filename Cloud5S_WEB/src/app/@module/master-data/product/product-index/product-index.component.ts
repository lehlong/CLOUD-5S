import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/MD/product.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ProductCreateComponent} from '../product-create/product-create.component';
import {ProductEditComponent} from '../product-edit/product-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ProductModel} from 'src/app/models/MD/product.model';
import Swal from 'sweetalert2';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ProductFilter, optionsGroup} from 'src/app/@filter/MD/product.filter';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PRODUCT_RIGHTS} from 'src/app/utils/constant/index';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss'],
})
export class ProductIndexComponent implements OnInit {
  constructor(
    private _service: ProductService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private globalService: GlobalService,
    private utils: utils,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách sản phẩm',
        path: 'master-data/product',
      },
    ]);
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }
  faFileExcel = faFileExcel;
  PRODUCT_RIGHTS = PRODUCT_RIGHTS;
  dataSource!: any;
  listItemTypeAll: any = [];

  //Khai báo biến
  breadcrumbList: any[] = [
    {
      name: 'Trang chủ',
      path: '',
    },
    {
      name: 'Sản Phẩm',
      path: '/master-data/san-pham',
    },
  ];
  displayedColumns: string[] = ['index', 'code', 'name', 'typeCode', 'isManufacture', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new ProductFilter();
  optionsGroup: optionsGroup[] = [];
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

  openDrawer(data?: ProductModel) {
    this.drawerService.open(ProductCreateComponent, {editData: data}).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ProductIndexComponent)) {
        this.loadInit();
      }
    });
  }

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-san-pham.xlsx';
      anchor.href = url;
      anchor.click();
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
        console.log('data test tao', this.paginationResult);
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: ProductFilter) => item.code == this.filter.code);
          if (detail) {
            this.openDrawer(detail);
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
    this.GetAllItemType();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  GetAllItemType() {
    this.dropdownService.GetAllItemType().subscribe(
      ({data}) => {
        this.listItemTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  reload() {
    this.filter = new ProductFilter();
    this.search();
  }

  deleteProduct(item: ProductModel) {
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
