import {Component} from '@angular/core';
import {ProviderService} from 'src/app/services/MD/provider.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/provider.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.scss'],
})
export class ProviderCreateComponent {
  providerForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: ProviderService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.providerForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      address: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.utils.trimSpace]],
      isCustomer: [false, [Validators.required]],
    });
  }

  get f() {
    return this.providerForm.controls;
  }

  close() {
    this.drawerService.close();
    this.providerForm?.get('code')?.setValue('');
    this.providerForm?.get('name')?.setValue('');
    this.providerForm?.get('isActive')?.setValue(true);
    this.providerForm?.get('address')?.setValue('');
    this.providerForm?.get('phoneNumber')?.setValue('');
    this.providerForm?.get('email')?.setValue('');
    this.providerForm?.get('isCustomer')?.setValue(false);
  }

  onCreate() {
    this.submitted = true;
    if (this.providerForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.providerForm.value.code.trim(),
          name: this.providerForm.value.name.trim(),
          isActive: this.providerForm.value.isActive,
          address: this.providerForm.value.address.trim(),
          phoneNumber: this.providerForm.value.phoneNumber.toString(),
          email: this.providerForm.value.email.trim(),
          isCustomer: this.providerForm.value.isCustomer,
          isProvider: true,
        },
        )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.providerForm?.get('code')?.setValue('');
          // this.providerForm?.get('name')?.setValue('');
          // this.providerForm?.get('isActive')?.setValue(true);
          // this.providerForm?.get('address')?.setValue('');
          // this.providerForm?.get('phoneNumber')?.setValue('');
          // this.providerForm?.get('email')?.setValue('');
          // this.providerForm?.get('isCustomer')?.setValue(false);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
