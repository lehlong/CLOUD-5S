import {Component} from '@angular/core';
import {PurchasingstationService} from 'src/app/services/MD/purchasing-station.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PurchasingStationCreateComponent} from '../purchasing-station-create/purchasing-station-create.component';
import {PurchasingStationEditComponent} from '../purchasing-station-edit/purchasing-station-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PurchasingstationFilter, optionsGroup} from 'src/app/@filter/MD/purchasingstation.filter';
import {PurchasingstationModel} from 'src/app/models/MD/Purchasingstation.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-purchasing-station-index',
  templateUrl: './purchasing-station-index.component.html',
  styleUrls: ['./purchasing-station-index.component.scss'],
})
export class PurchasingStationIndexComponent {
  constructor(
    private _service: PurchasingstationService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách trạm thu mua',
        path: 'master-data/area',
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
  displayedColumns: string[] = [
    'index',
    'code',
    'name',
    'address',
    'areaCode',
    'area',
    'phoneNumber',
    'isActive',
    'actions',
  ];
  paginationResult!: PaginationResult;
  filter = new PurchasingstationFilter();
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

  // exportExcel() {
  //   return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
  //     const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  //     const url = window.URL.createObjectURL(blob);
  //     var anchor = document.createElement('a');
  //     anchor.download = 'danh-sach-khu-vuc.xlsx';
  //     anchor.href = url;
  //     anchor.click();
  //   });
  // }

  openCreate() {
    this.drawerService.open(PurchasingStationCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PurchasingStationIndexComponent)) {
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
        address: item.address,
        phoneNumber: item.phoneNumber,
        areaCode: item.areaCode,
      },
    });
    this.drawerService
      .open(PurchasingStationEditComponent, {
        code: item.code,
        name: item.name,
        address: item.address,
        phoneNumber: item.phoneNumber,
        areaCode: item.areaCode,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(PurchasingStationIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    let params: any = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
    };
    delete params['isActive'];
    this._service.search(params).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: params});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: PurchasingstationFilter) => item.code == this.filter.code);
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

  deletePurchasing(item: PurchasingstationModel) {
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
