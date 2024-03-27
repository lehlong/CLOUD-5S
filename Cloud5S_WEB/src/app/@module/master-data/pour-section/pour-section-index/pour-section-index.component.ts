import {Component} from '@angular/core';
import {PourSectionService} from 'src/app/services/MD/pour-section.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PourSectionCreateComponent} from '../pour-section-create/pour-section-create.component';
import {PourSectionEditComponent} from '../pour-section-edit/pour-section-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PourSectionFilter, optionsGroup} from 'src/app/@filter/MD/pour-section.filter';
import {PourSectionModel} from 'src/app/models/MD/pour-section.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
import {POURSECTION_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-pour-section-index',
  templateUrl: './pour-section-index.component.html',
  styleUrls: ['./pour-section-index.component.scss'],
})
export class PourSectionIndexComponent {
  constructor(
    private _service: PourSectionService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách khu vực đổ hàng',
        path: 'master-data/pour-section',
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
  displayedColumns: string[] = ['index', 'code', 'name', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new PourSectionFilter();
  optionsGroup: optionsGroup[] = [];
  POURSECTION_RIGHTS = POURSECTION_RIGHTS;
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

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-khu-vuc-do-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  openCreate() {
    this.drawerService.open(PourSectionCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PourSectionIndexComponent)) {
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
      .open(PourSectionEditComponent, {
        code: item.code,
        name: item.name,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(PourSectionIndexComponent)) {
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
          const detail = data?.data?.find((item: PourSectionFilter) => item.code == this.filter.code);
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

  deletePourSection(item: PourSectionModel) {
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
