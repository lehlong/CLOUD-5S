import {Component} from '@angular/core';
import {CustomerService} from 'src/app/services/SO/customer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/provider.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
})
export class CustomerCreateComponent {
  customerForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: CustomerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.customerForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      address: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],
      email: ['', [Validators.required, Validators.email, this.utils.trimSpace]],
      isProvider: [false, [Validators.required]],
      isCustomer: [false, [Validators.required]],
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  close() {
    this.drawerService.close();
    this.customerForm?.get('code')?.setValue('');
    this.customerForm?.get('name')?.setValue('');
    this.customerForm?.get('isActive')?.setValue(true);
    this.customerForm?.get('address')?.setValue('');
    this.customerForm?.get('phoneNumber')?.setValue('');
    this.customerForm?.get('email')?.setValue('');
    this.customerForm?.get('isProvider')?.setValue(false);
    this.customerForm?.get('isCustomer')?.setValue(false);
  }

  onCreate() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.customerForm.value.code.trim(),
          name: this.customerForm.value.name.trim(),
          isActive: this.customerForm.value.isActive,
          address: this.customerForm.value.address.trim(),
          phoneNumber: this.customerForm.value.phoneNumber.toString(),
          email: this.customerForm.value.email.trim(),
          isProvider: this.customerForm.value.isProvider,
          isCustomer: true,
        },
        )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.customerForm?.get('code')?.setValue('');
          this.customerForm?.get('name')?.setValue('');
          this.customerForm?.get('isActive')?.setValue(true);
          this.customerForm?.get('address')?.setValue('');
          this.customerForm?.get('phoneNumber')?.setValue('');
          this.customerForm?.get('email')?.setValue('');
          this.customerForm?.get('isProvider')?.setValue(false);
          this.customerForm?.get('isCustomer')?.setValue(false);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
