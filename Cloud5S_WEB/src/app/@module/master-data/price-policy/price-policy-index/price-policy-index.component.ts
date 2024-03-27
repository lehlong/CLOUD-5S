import {Component, OnInit} from '@angular/core';
import {PricePolicyService} from 'src/app/services/MD/price-policy.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PricePolicyCreateComponent} from '../price-policy-create/price-policy-create.component';
import {PricePolicyEditComponent} from '../price-policy-edit/price-policy-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PricePolicyFilter} from 'src/app/@filter/MD/price-policy.filter';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {PricePolicyModel, optionsGroup} from 'src/app/models/MD/price-policy.model';
import {ITEMTYPE_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-price-policy-index',
  templateUrl: './price-policy-index.component.html',
  styleUrls: ['./price-policy-index.component.scss'],
})
export class PricePolicyIndexComponent {
  constructor(
    private _service: PricePolicyService,
    private drawerService: DrawerService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Chính sách giá',
        path: 'master-data/price-policy',
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
  displayedColumns: string[] = [
    'index',
    'areaCode',
    'itemCode',
    'price',
    'dateStart',
    'dateEnd',
    'isActive',
    'actions',
  ];
  paginationResult!: PaginationResult;
  filter = new PricePolicyFilter();
  faFileExcel = faFileExcel;
  optionsGroup: optionsGroup[] = [];
  ITEMTYPE_RIGHTS = ITEMTYPE_RIGHTS;

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
      anchor.download = 'danh-sach-chinh-sach-gia.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  openCreate() {
    this.drawerService.open(PricePolicyCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PricePolicyIndexComponent)) {
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
        areaCode: item.areaCode,
        itemCode: item.itemCode,
        // fromDate: item.fromDate,
        // toDate: item.toDate,
      },
    });
    this.drawerService
      .open(PricePolicyEditComponent, {
        id: item.id,
        areaCode: item.areaCode,
        itemCode: item.itemCode,
        fromDate: item.fromDate,
        toDate: item.toDate,
        price: item.price,
        note: item.note,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(PricePolicyIndexComponent)) {
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
    };
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.id !== '') {
          const detail = data?.data?.find((item: PricePolicyFilter) => item.id == this.filter.id);
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

  deleteItemType(item: PricePolicyModel) {
    Swal.fire({
        showCloseButton: true,
      title: 'Bạn có chắc chắn muốn xóa dữ liệu?',
      text: 'Hành động này sẽ không thể hoàn tác!',
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
