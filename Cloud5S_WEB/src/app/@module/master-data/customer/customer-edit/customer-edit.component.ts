import {Component} from '@angular/core';
import {CustomerService} from 'src/app/services/SO/customer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CustomerFilter} from 'src/app/@filter/SO/customer.filter';
import {optionsGroup} from 'src/app/@filter/SO/customer.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent {
  customerForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  address: string = '';
  phoneNumber: string = '';
  email: string = '';
  isProvider!: boolean;
  isCustomer!: boolean;
  filter = new CustomerFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: CustomerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.customerForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      address: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],
      email: ['', [Validators.required, Validators.email, this.utils.trimSpace]],
      isProvider: [false, [Validators.required]],
      isCustomer: [false, [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  ngOnInit() {
    this.customerForm?.get('code')?.setValue(this.code);
    this.customerForm?.get('name')?.setValue(this.name);
    this.customerForm?.get('isActive')?.setValue(this.isActive || false);
    this.customerForm?.get('address')?.setValue(this.address);
    this.customerForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.customerForm?.get('email')?.setValue(this.email);
    this.customerForm?.get('isProvider')?.setValue(this.isProvider);
    this.customerForm?.get('isCustomer')?.setValue(this.isCustomer);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
      address: '',
      phoneNumber: '',
      email: '',
      isProvider: '',
      isCustomer: '',
    };
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

  onEdit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.customerForm.value.name.trim(),
          address: this.customerForm.value.address.trim(),
          isActive: this.customerForm.value.isActive,
          phoneNumber: this.customerForm.value.phoneNumber.toString(),
          email: this.customerForm.value.email.trim(),
          isProvider: this.customerForm.value.isProvider,
          isCustomer: this.customerForm.value.isCustomer,
        },
      )
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
