import {Component, ElementRef, ViewChild} from '@angular/core';
import {MessageManagementService} from 'src/app/services/System-manage/message-management.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {MessageManagementFilter, optionsGroup} from 'src/app/@filter/System-manage/message-management.filter';
import {MessageManagementModel} from 'src/app/models/System-manage/message-management.model';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SystemParameterService} from 'src/app/services/System-manage/system-parameter.service';
import {SystemParameterModel} from 'src/app/models/System-manage/system-parameter.model';

@Component({
  selector: 'app-system-parameter',
  templateUrl: './system-parameter.component.html',
  styleUrls: ['./system-parameter.component.scss'],
})
export class SystemParameterComponent {
  @ViewChild('inputField') inputField!: ElementRef;
  constructor(
    private _service: SystemParameterService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
    private fb: FormBuilder,
    private dropdownService: DropdownService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Cấu hình hệ thống ',
        path: 'system-manage/Cấu hình hệ thống',
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
  displayedColumns: string[] = ['index', 'name', 'value', 'actions'];
  editDropDownList: string[] = [
    'defaultIngredientItemCode',

    'defaultProductItemCode',
    'defaultProductStock',
    'unitCode',
    'defaultCompanyCode',
  ];
  paginationResult!: PaginationResult;
  filter = new MessageManagementFilter();
  detail: any;
  keys: any;
  values: any;
  optionsGroup: optionsGroup[] = [];
  faFileExcel = faFileExcel;
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];
  //form
  actionFormGroup!: FormGroup;
  //dropdown
  listItem: any = [];
  listStock: any = [];
  listCompany: any = [];
  listUnit: any = [];
  //Khai báo hàm
  ngOnInit(): void {
    this.actionFormGroup = new FormGroup({
      portName: new FormControl('', [Validators.required]),
      portAddress: new FormControl('', [Validators.required]),
      portLatitude: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      portLongitude: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),

      defaultIngredientItemCode: new FormControl('', [Validators.required]),
      defaultProductItemCode: new FormControl('', [Validators.required]),
      defaultIngredientStock: new FormControl('', [Validators.required]),
      defaultProductStock: new FormControl('', [Validators.required]),
      unitCode: new FormControl('', [Validators.required]),
      defaultCompanyCode: new FormControl('', [Validators.required]),
    });
    Promise.all([
      this.dropdownService.GetAllStock().toPromise(),
      this.dropdownService.GetAllItem().toPromise(),
      this.dropdownService.GetAllCompany().toPromise(),
      this.dropdownService.GetAllUnit().toPromise(),
    ])
      .then(([stockData, itemData, companyData, unitData]) => {
        this.listStock = stockData?.data;
        this.listItem = itemData?.data;
        this.listCompany = companyData?.data;
        this.listUnit = unitData?.data;
      })
      .catch((error) => {
        console.log('error: ', error);
      });
    this.loadData();
  }
  get portName() {
    return this.actionFormGroup.get('portName');
  }
  get portAddress() {
    return this.actionFormGroup.get('portAddress');
  }
  get portLatitude() {
    return this.actionFormGroup.get('portLatitude');
  }
  get portLongitude() {
    return this.actionFormGroup.get('portLongitude');
  }
  get defaultIngredientItemCode() {
    return this.actionFormGroup.get('defaultIngredientItemCode');
  }
  get defaultProductItemCode() {
    return this.actionFormGroup.get('defaultProductItemCode');
  }
  get defaultIngredientStock() {
    return this.actionFormGroup.get('defaultIngredientStock');
  }
  get defaultProductStock() {
    return this.actionFormGroup.get('defaultProductStock');
  }
  get unitCode() {
    return this.actionFormGroup.get('unitCode');
  }
  get defaultCompanyCode() {
    return this.actionFormGroup.get('defaultCompanyCode');
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  exportExcel() {}
  loadData() {
    this._service.detail().subscribe({
      next: ({data}) => {
        console.log(data);
        this.detail = data;
        this.keys = Object.keys(this.detail);
        //this.values = Object.entries(this.detail);
        this.actionFormGroup.setValue({
          portName: this.detail.portName ? this.detail.portName : '',
          portAddress: this.detail.portAddress ? this.detail.portAddress : '',
          portLatitude: this.detail.portLatitude ? this.detail.portLatitude : null,
          portLongitude: this.detail.portLongitude ? this.detail.portLongitude : null,

          defaultIngredientItemCode: this.detail.defaultIngredientItemCode ? this.detail.defaultIngredientItemCode : '',
          defaultProductItemCode: this.detail.defaultProductItemCode ? this.detail.defaultProductItemCode : '',
          defaultIngredientStock: this.detail.defaultIngredientStock ? this.detail.defaultIngredientStock : '',
          defaultProductStock: this.detail.defaultProductStock ? this.detail.defaultProductStock : '',
          unitCode: this.detail.unitCode ? this.detail.unitCode : '',
          defaultCompanyCode: this.detail.defaultCompanyCode ? this.detail.defaultCompanyCode : '',
        });
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route});
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
      code: item,
      value: this.detail[item],
      submitted: false,
    };

    this.editForm = this.fb.group({
      value: new FormControl(this.detail[item], [Validators.required]),
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
    console.log(this.editForm.value);
  }

  resetEdit() {
    this.editingEvent = {
      code: '',
      value: '',
      submitted: false,
    };
  }
  onChangePage(pageNumber: number) {}

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.loadData();
  }

  returnName(key: any) {
    switch (key) {
      case 'portName':
        return 'Tên port';
      case 'portAddress':
        return 'Địa chỉ port';
      case 'portLatitude':
        return 'Vĩ độ';
      case 'portLongitude':
        return 'Kinh độ';
      case 'defaultItemExportCode':
        return 'defaultItemExportCode';
      case 'defaultItemImportCode':
        return 'defaultItemImportCode';
      case 'defaultIngredientItemCode':
        return 'Nguyên liệu mặc định';
      case 'defaultProductItemCode':
        return 'Thành phẩm mặc định';
      case 'defaultIngredientStock':
        return 'Kho nguyên liệu mặc định';
      case 'pordefaultProductStock':
        return 'Kho thành phẩm mặc định';
      case 'unitCode':
        return 'Đơn vị tính';
      case 'defaultCompanyCode':
        return 'Nhà máy mặc định';
      default:
        return key;
    }
  }
  returnValue(key: any) {
    return this.detail[key];
  }

  isEditDropdown(key: any) {
    if (this.editDropDownList.includes(key)) return true;
    return false;
  }

  submit() {
    const form = this.actionFormGroup.value;
    console.log(form);
    if (this.actionFormGroup.invalid) {
      return;
    }
    let data: SystemParameterModel = {
      id: this.detail.id,
      portName: form.portName,
      portAddress: form.portAddress,
      portLatitude: form.portLatitude,
      portLongitude: form.portLongitude,
      defaultItemExportCode: form.defaultItemExportCode,
      defaultItemImportCode: form.defaultItemImportCode,
      defaultIngredientItemCode: form.defaultIngredientItemCode,
      defaultProductItemCode: form.defaultProductItemCode,
      defaultIngredientStock: form.defaultIngredientStock,
      defaultProductStock: form.defaultProductStock,
      unitCode: form.unitCode,
      defaultCompanyCode: form.defaultCompanyCode,
    };
    this._service.Update(data).subscribe(
      (data) => {
        this.loadData();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
