import {Component} from '@angular/core';
import {DepartmentService} from 'src/app/services/MD/department.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {optionsGroup} from 'src/app/@filter/MD/product.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DepartmentFilter} from 'src/app/@filter/MD/department.filter';
import {DEPARTMENT_RIGHTS} from 'src/app/utils/constant/index';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss'],
})
export class DepartmentEditComponent {
  dpmForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  companys: any[] = [];
  DEPARTMENT_RIGHTS = DEPARTMENT_RIGHTS;
  name: string = '';
  companyCode: string = '';
  isActive: boolean | null = null;
  filter = new DepartmentFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: DepartmentService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private dropDownService: DropdownService,
  ) {
    this.dpmForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      companyCode: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.dpmForm.controls;
  }

  ngOnInit() {
    this.dropDownService.GetAllCompany().subscribe((result: any) => {
      this.companys = result.data;
    });
    this.dpmForm?.get('code')?.setValue(this.code);
    this.dpmForm?.get('name')?.setValue(this.name);
    this.dpmForm?.get('companyCode')?.setValue(this.companyCode);
    this.dpmForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      companyCode: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.dpmForm?.get('code')?.setValue('');
    this.dpmForm?.get('name')?.setValue('');
    this.dpmForm?.get('companyCode')?.setValue('');
    this.dpmForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.dpmForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
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
