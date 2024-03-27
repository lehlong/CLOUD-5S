import {Component, OnInit} from '@angular/core';
import {IncomeTypeService} from 'src/app/services/MD/in-come.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {InComeCreateComponent} from '../in-come-create/in-come-create.component';
import {InComeEditComponent} from '../in-come-edit/in-come-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {IncomeFilter, optionsGroup} from 'src/app/@filter/MD/in-come.filter';
import {IncomeModel} from 'src/app/models/MD/in-come.model';
import Swal from 'sweetalert2';
import {INCOMETYPE_RIGHTS} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-in-come-index',
  templateUrl: './in-come-index.component.html',
  styleUrls: ['./in-come-index.component.scss'],
})
export class InComeIndexComponent {
  constructor(
    private _service: IncomeTypeService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách nội dung thu',
        path: 'master-data/in-come',
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
      name: 'nội dung thu',
      path: '/master-data/in-come',
    },
  ];
  displayedColumns: string[] = ['index', 'name', 'note', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new IncomeFilter();
  faFileExcel = faFileExcel;
  INCOMETYPE_RIGHTS = INCOMETYPE_RIGHTS;
  optionsGroup: optionsGroup[] = [];
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];

  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }

  openCreate() {
    this.drawerService.open(InComeCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(InComeIndexComponent)) {
        this.loadInit();
      }
    });
  }
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-noi-dung-thu.xlsx';
      anchor.href = url;
      anchor.click();
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
        note: item.nextote,
        isActive: item.isActive,
      },
    });
    this.drawerService
      .open(InComeEditComponent, {
        id: item.id,
        name: item.name,
        note: item.note,
        isActive: item.isActive,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(InComeIndexComponent)) {
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
          const detail = data?.data?.find((item: IncomeFilter) => item.id == this.filter.id);
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
    this.filter = new IncomeFilter();
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }

  deleteIncome(item: IncomeModel) {
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
