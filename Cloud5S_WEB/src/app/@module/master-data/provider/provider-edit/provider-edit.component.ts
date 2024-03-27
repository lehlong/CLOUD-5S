import {Component} from '@angular/core';
import {ProviderService} from 'src/app/services/MD/provider.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ProviderFilter} from 'src/app/@filter/MD/provider.filter';
import {optionsGroup} from 'src/app/@filter/MD/provider.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.scss'],
})
export class ProviderEditComponent {
  providerForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  address: string = '';
  phoneNumber: string = '';
  email: string = '';
  isCustomer!: boolean;
  filter = new ProviderFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  isProvider: boolean = true;
  constructor(
    private _service: ProviderService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.providerForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      address: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],
      email: ['', [Validators.required, Validators.email, this.utils.trimSpace]],
      isCustomer: [false, [Validators.required]],
      isProvider: [true, [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.providerForm.controls;
  }

  ngOnInit() {
    this.providerForm?.get('code')?.setValue(this.code);
    this.providerForm?.get('name')?.setValue(this.name);
    this.providerForm?.get('isActive')?.setValue(this.isActive || false);
    this.providerForm?.get('address')?.setValue(this.address);
    this.providerForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.providerForm?.get('email')?.setValue(this.email);
    this.providerForm?.get('isCustomer')?.setValue(this.isCustomer);
    this.providerForm?.get('isProvider')?.setValue(this.isProvider);
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
      isCustomer: '',
      isProvider: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.providerForm?.get('code')?.setValue('');
    this.providerForm?.get('name')?.setValue('');
    this.providerForm?.get('isActive')?.setValue(true);
    this.providerForm?.get('address')?.setValue('');
    this.providerForm?.get('phoneNumber')?.setValue('');
    this.providerForm?.get('email')?.setValue('');
    this.providerForm?.get('isCustomer')?.setValue(false);
  }

  onEdit() {
    this.submitted = true;
    if (this.providerForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.providerForm.value.name.trim(),
          isActive: this.providerForm.value.isActive,
          address: this.providerForm.value.address.trim(),
          phoneNumber: this.providerForm.value.phoneNumber.toString(),
          email: this.providerForm.value.email.trim(),
          isCustomer: this.providerForm.value.isCustomer,
          isProvider: this.providerForm.value.isProvider,
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
