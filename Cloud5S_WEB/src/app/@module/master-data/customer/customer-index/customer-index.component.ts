import {Component, OnInit} from '@angular/core';
import {CustomerService} from 'src/app/services/SO/customer.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {CustomerCreateComponent} from '../customer-create/customer-create.component';
import {CustomerEditComponent} from '../customer-edit/customer-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {CustomerFilter, optionsGroup} from 'src/app/@filter/SO/customer.filter';
import Swal from 'sweetalert2';
import {CustomerModel} from 'src/app/models/MD/customer.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-customer-index',
  templateUrl: './customer-index.component.html',
  styleUrls: ['./customer-index.component.scss'],
})
export class CustomerIndexComponent implements OnInit {
  constructor(
    private _service: CustomerService,
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
  displayedColumns: string[] = ['index', 'code', 'name', 'address', 'phoneNumber', 'email', 'isActive', 'actions'];
  paginationResult!: PaginationResult;
  filter = new CustomerFilter();
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
    this.drawerService.open(CustomerCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(CustomerIndexComponent)) {
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
        isProvider: item.isProvider,
        isCustomer: true,
      },
    });
    this.drawerService
      .open(CustomerEditComponent, {
        code: item.code,
        name: item.name,
        isActive: item.isActive,
        address: item.address,
        phoneNumber: item.phoneNumber,
        email: item.email,
        isProvider: item.isProvider,
        isCustomer: true,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(CustomerIndexComponent)) {
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
      isCustomer: true,
      isProvider: '',
    };

    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: CustomerFilter) => item.code == this.filter.code);
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
    
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.search(this.filter.currentPage);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
  deleteCustomer(item: CustomerModel) {
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
