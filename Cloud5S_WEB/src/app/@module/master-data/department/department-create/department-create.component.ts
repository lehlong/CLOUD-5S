import {Component} from '@angular/core';
import {DepartmentService} from 'src/app/services/MD/department.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/product.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DEPARTMENT_RIGHTS} from 'src/app/utils/constant/index';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss'],
})
export class DepartmentCreateComponent {
  dpmForm: FormGroup;
  submitted: boolean = false;
  companys: any[] = [];
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  DEPARTMENT_RIGHTS = DEPARTMENT_RIGHTS;

  constructor(
    private _service: DepartmentService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropDownService: DropdownService,
  ) {
    this.dpmForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      companyCode: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  ngOnInit() {
    this.dropDownService.GetAllCompany().subscribe((result: any) => {
      this.companys = result.data;
    });
  }

  get f() {
    return this.dpmForm.controls;
  }

  close() {
    this.drawerService.close();
    this.dpmForm?.get('code')?.setValue('');
    this.dpmForm?.get('name')?.setValue('');
    this.dpmForm?.get('companyCode')?.setValue('');
    this.dpmForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.dpmForm.setValue({
      ...this.dpmForm.value,
      code: this.dpmForm.value.code.trim(),
    });
    if (this.dpmForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.dpmForm.value.code.trim(),
        name: this.dpmForm.value.name.trim(),
        companyCode: this.dpmForm.value.companyCode.trim(),
        isActive: this.dpmForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
