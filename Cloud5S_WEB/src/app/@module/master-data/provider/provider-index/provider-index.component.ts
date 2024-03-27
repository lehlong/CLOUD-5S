import {Component, OnInit} from '@angular/core';
import {ProviderService} from 'src/app/services/MD/provider.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ProviderCreateComponent} from '../provider-create/provider-create.component';
import {ProviderEditComponent} from '../provider-edit/provider-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ProviderFilter, optionsGroup} from 'src/app/@filter/MD/provider.filter';
import Swal from 'sweetalert2';
import {ProviderModel} from 'src/app/models/MD/provider.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-provider-index',
  templateUrl: './provider-index.component.html',
  styleUrls: ['./provider-index.component.scss'],
})
export class ProviderIndexComponent implements OnInit {
  constructor(
    private _service: ProviderService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  //Khai báo biến

  displayedColumns: string[] = ['index', 'code', 'name', 'address', 'phoneNumber', 'email', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new ProviderFilter();
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
    this.drawerService.open(ProviderCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ProviderIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openEdit(item: any) {
    this.router.navigate([], {
      replaceUrl: true, relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: item.code,
        name: item.name,
        isActive: item.isActive,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        isProvider: true,
        isCustomer: item.isCustomer,
      },
    });
    this.drawerService
      .open(ProviderEditComponent, {
        code: item.code,
        name: item.name,
        isActive: item.isActive,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        isProvider: true,
        isCustomer: item.isCustomer,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(ProviderIndexComponent)) {
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
      isCustomer: '',
      isProvider: true,
    };
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: ProviderFilter) => item.code == this.filter.code);
          if (detail) {
            console.log('coo');

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
  deleteProvider(item: ProviderModel) {
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
