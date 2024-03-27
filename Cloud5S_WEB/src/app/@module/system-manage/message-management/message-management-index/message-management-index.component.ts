import {Component, ElementRef, ViewChild} from '@angular/core';
import {MessageManagementService} from 'src/app/services/System-manage/message-management.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {MessageManagementCreateComponent} from '../message-management-create/message-management-create.component';
// import {AreaEditComponent} from '../area-edit/area-edit.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {MessageManagementFilter, optionsGroup} from 'src/app/@filter/System-manage/message-management.filter';
import {MessageManagementModel} from 'src/app/models/System-manage/message-management.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MESSAGE_RIGHTS} from 'src/app/utils/constant';
@Component({
  selector: 'app-message-management-index',
  templateUrl: './message-management-index.component.html',
  styleUrls: ['./message-management-index.component.scss'],
})
export class MessageManagementIndexComponent {
  @ViewChild('inputField') inputField!: ElementRef;
  constructor(
    private _service: MessageManagementService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
    private fb: FormBuilder,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách thông báo',
        path: 'system-manage/message-manage',
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
  displayedColumns: string[] = ['index', 'code', 'value', 'actions'];
  paginationResult!: PaginationResult;
  filter = new MessageManagementFilter();
  optionsGroup: optionsGroup[] = [];
  faFileExcel = faFileExcel;
  MESSAGE_RIGHTS = MESSAGE_RIGHTS;
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
    // return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
    //   const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    //   const url = window.URL.createObjectURL(blob);
    //   var anchor = document.createElement('a');
    //   anchor.download = 'danh-sach-khu-vuc.xlsx';
    //   anchor.href = url;
    //   anchor.click();
    // });
  }

  openCreate() {
    this.drawerService.open(MessageManagementCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(MessageManagementIndexComponent)) {
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
        console.log(data);
        this.paginationResult = data;
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: MessageManagementFilter) => item.code == this.filter.code);
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
  editingEvent = {
    code: '',
    value: '',
    submitted: false,
  };
  editForm!: FormGroup;

  openEdit(item: any) {
    this.editingEvent = {
      code: item.code,
      value: item.value,
      submitted: false,
    };

    this.editForm = this.fb.group({
      value: new FormControl(item.value, [Validators.required]),
    });
    this.editForm;
    setTimeout(() => {
      if (this.inputField) {
        this.inputField.nativeElement.select();
      }
    });
  }
  get editf() {
    return this.editForm.controls;
  }

  saveEdit() {
    this.editingEvent.submitted = true;
    if (!this.editForm.valid) return;
    this._service.Update({...this.editForm.value, code: this.editingEvent.code}).subscribe((response) => {
      this.paginationResult.data = this.paginationResult.data.map((ele: any) => {
        if (ele.code === this.editingEvent.code) {
          ele.value = this.editForm.value.value;
        }
        return ele;
      });

      this.resetEdit();
    });
  }

  resetEdit() {
    this.editingEvent = {
      code: '',
      value: '',
      submitted: false,
    };
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

  deleteArea(item: MessageManagementModel) {
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
