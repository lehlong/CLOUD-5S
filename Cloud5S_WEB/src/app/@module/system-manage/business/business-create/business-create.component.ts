import {Component} from '@angular/core';
import {BusinessService} from 'src/app/services/AD/business.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/AD/business.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {BUSINESS_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-business-create',
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.scss'],
})
export class BusinessCreateComponent {
  businessForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  BUSINESS_RIGHTS = BUSINESS_RIGHTS;

  constructor(
    private _service: BusinessService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.businessForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      shortName: ['', [this.utils.trimSpace]],
      taxCode: ['', [this.utils.trimSpace]],
      email: ['', [this.utils.trimSpace]],
      phone: ['', [this.utils.trimSpace]],
      address: ['', [this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.businessForm.controls;
  }

  close() {
    this.drawerService.close();
    this.businessForm?.get('code')?.setValue('');
    this.businessForm?.get('name')?.setValue('');
    this.businessForm?.get('shortName')?.setValue('');
    this.businessForm?.get('taxCode')?.setValue('');
    this.businessForm?.get('email')?.setValue('');
    this.businessForm?.get('phone')?.setValue('');
    this.businessForm?.get('address')?.setValue('');
    this.businessForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.businessForm.setValue({
      ...this.businessForm.value,
      code: this.businessForm.value.code.trim(),
    });
    if (this.businessForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.businessForm.value.code.trim(),
        name: this.businessForm.value.name.trim(),
        shortName: this.businessForm.value.shortName.trim(),
        taxCode: this.businessForm.value.taxCode.trim(),
        email: this.businessForm.value.email.trim(),
        phone: this.businessForm.value.phone.trim(),
        address: this.businessForm.value.address.trim(),
        isActive: this.businessForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.areaForm?.get('code')?.setValue('');
          // this.areaForm?.get('name')?.setValue('');
          // this.areaForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
