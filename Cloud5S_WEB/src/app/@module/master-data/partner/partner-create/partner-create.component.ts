import {Component} from '@angular/core';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/partner.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {PARTNER_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.scss'],
})
export class PartnerCreateComponent {
  partnerForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  PARTNER_RIGHTS = PARTNER_RIGHTS;

  constructor(
    private _service: PartnerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.partnerForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      taxCode: ['', [Validators.required, , Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      address: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],
      email: ['', [Validators.required, Validators.email, this.utils.trimSpace]],
      isProvider: [false, [Validators.required]],
      isCustomer: [true, [Validators.required]],
    });
  }

  get f() {
    return this.partnerForm.controls;
  }

  close() {
    this.drawerService.close();
    this.partnerForm?.get('code')?.setValue('');
    this.partnerForm?.get('name')?.setValue('');
    this.partnerForm?.get('taxCode')?.setValue('');
    this.partnerForm?.get('isActive')?.setValue(true);
    this.partnerForm?.get('address')?.setValue('');
    this.partnerForm?.get('phoneNumber')?.setValue('');
    this.partnerForm?.get('email')?.setValue('');
    this.partnerForm?.get('isProvider')?.setValue(false);
    this.partnerForm?.get('isCustomer')?.setValue(false);
  }

  onCreate() {
    this.submitted = true;
    this.partnerForm.setValue({
      ...this.partnerForm.value,
      taxCode: this.partnerForm.value.taxCode.trim(),
    });
    if (this.partnerForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.partnerForm.value.code,
        name: this.partnerForm.value.name.trim(),
        taxCode: this.partnerForm.value.taxCode,
        isActive: this.partnerForm.value.isActive,
        address: this.partnerForm.value.address.trim(),
        phoneNumber: this.partnerForm.value.phoneNumber.toString(),
        email: this.partnerForm.value.email.trim(),
        isProvider: this.partnerForm.value.isProvider,
        isCustomer: this.partnerForm.value.isCustomer,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.partnerForm?.get('code')?.setValue('');
          // this.partnerForm?.get('name')?.setValue('');
          // this.partnerForm?.get('isActive')?.setValue(true);
          // this.partnerForm?.get('address')?.setValue('');
          // this.partnerForm?.get('phoneNumber')?.setValue('');
          // this.partnerForm?.get('email')?.setValue('');
          // this.partnerForm?.get('isProvider')?.setValue(false);
          // this.partnerForm?.get('isCustomer')?.setValue(false);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
