import {Component} from '@angular/core';
import {PourlineService} from 'src/app/services/MD/pour-line.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PourLineCreateComponent} from '../pour-line-create/pour-line-create.component';
import {PourLineEditComponent} from '../pour-line-edit/pour-line-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PourlineFilter, optionsGroup} from 'src/app/@filter/MD/pour-line.filter';
import {PourlineModel} from 'src/app/models/MD/pour-line.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
import {POURLINE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-pour-line-index',
  templateUrl: './pour-line-index.component.html',
  styleUrls: ['./pour-line-index.component.scss'],
})
export class PourLineIndexComponent {
  constructor(
    private _service: PourlineService,
    private drawerService: DrawerService,
    private router: Router,
    private dropdownService: DropdownService,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách dãy đổ hàng',
        path: 'master-data/pour-line',
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
  displayedColumns: string[] = ['index', 'code', 'name', 'sectionCode', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new PourlineFilter();
  optionsGroup: optionsGroup[] = [];
  faFileExcel = faFileExcel;
  POURLINE_RIGHTS = POURLINE_RIGHTS;
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  listPourSectionAll: any = [];

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
      anchor.download = 'danh-sach-day-do-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  GetAllPourSection() {
    this.dropdownService.GetAllPourSection().subscribe(
      ({data}) => {
        this.listPourSectionAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  openCreate() {
    this.drawerService.open(PourLineCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(PourLineIndexComponent)) {
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
      .open(PourLineEditComponent, {
        code: item.code,
        name: item.name,
        sectionCode: item.sectionCode,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(PourLineIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      sectionCode: this.filter.sectionCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: PourlineFilter) => item.code == this.filter.code);
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
    this.GetAllPourSection();
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

  reload() {
    this.filter = new PourlineFilter();
    this.search();
  }

  deletePourline(item: PourlineModel) {
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
