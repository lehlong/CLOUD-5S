import {Component, OnInit} from '@angular/core';
import {WareHouseService} from 'src/app/services/MD/warehouse.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {WarehouseCreateComponent} from '../warehouse-create/warehouse-create.component';
import {WarehouseEditComponent} from '../warehouse-edit/warehouse-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {WareHouseFilter, optionsGroup} from 'src/app/@filter/MD/warehouse.filter';
import {WareHouseModel} from 'src/app/models/MD/ware-house.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {STOCK_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-warehouse-index',
  templateUrl: './warehouse-index.component.html',
  styleUrls: ['./warehouse-index.component.scss'],
})
export class WarehouseIndexComponent implements OnInit {
  constructor(
    private _service: WareHouseService,
    private drawerService: DrawerService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'content.masterdata.stock.list.breadcrumb',
        path: 'master-data/stock',
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
  filter = new WareHouseFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];
  STOCK_RIGHTS = STOCK_RIGHTS;

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
      anchor.download = 'danh-sach-kho-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  openCreate() {
    this.drawerService.open(WarehouseCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(WarehouseIndexComponent)) {
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
      .open(WarehouseEditComponent, {
        code: item.code,
        name: item.name,
        companyCode: item.companyCode,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(WarehouseIndexComponent)) {
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
      companyCode: '',
    };
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        console.log('data: ', data);
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: WareHouseFilter) => item.code == this.filter.code);
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

  deleteWarehouse(item: WareHouseModel) {
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
