import {Component} from '@angular/core';
import {WareHouseService} from 'src/app/services/MD/warehouse.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STOCK_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.scss'],
})
export class WarehouseCreateComponent {
  whForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  companyCodes: any[] = [];
  filterGroup = new BaseFilter();
  STOCK_RIGHTS = STOCK_RIGHTS;
  constructor(
    private _service: WareHouseService,
    private _service1: DropdownService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.whForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      companyCode: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.whForm.controls;
  }

  close() {
    this.drawerService.close();
    this.whForm?.get('code')?.setValue('');
    this.whForm?.get('name')?.setValue('');
    this.whForm?.get('companyCode')?.setValue('');
    this.whForm?.get('isActive')?.setValue(true);
  }

  ngOnInit(): void {
    this._service1.GetAllCompany().subscribe((result: any) => {
      this.companyCodes = result.data;
    });
  }
  onCreate() {
    this.submitted = true;
    this.whForm.setValue({
      ...this.whForm.value,
      code: this.whForm.value.code.trim(),
    });
    if (this.whForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.whForm.value.code.trim(),
        name: this.whForm.value.name.trim(),
        companyCode: this.whForm.value.companyCode.trim(),
        isActive: this.whForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          // this.submitted = false;
          // this.whForm?.get('code')?.setValue('');
          // this.whForm?.get('name')?.setValue('');
          // this.whForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
