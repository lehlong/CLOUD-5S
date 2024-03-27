import {Component} from '@angular/core';
import {BusinessService} from 'src/app/services/AD/business.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BusinessFilter} from 'src/app/@filter/AD/business.filter';
import {optionsGroup} from 'src/app/@filter/AD/business.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {BUSINESS_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent {
  businessForm: FormGroup;
  submitted: boolean = false;

  code: string = '';
  name: string = '';
  shortName: string = '';
  taxCode: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  BUSINESS_RIGHTS = BUSINESS_RIGHTS;
  isActive: boolean | null = null;
  filter = new BusinessFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: BusinessService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.businessForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      shortName: ['', [this.utils.trimSpace]],
      taxCode: ['', [this.utils.trimSpace]],
      email: ['', [this.utils.trimSpace]],
      phone: ['', [this.utils.trimSpace]],
      address: ['', [this.utils.trimSpace]],
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
    return this.businessForm.controls;
  }

  ngOnInit() {
    this.businessForm?.get('code')?.setValue(this.code);
    this.businessForm?.get('name')?.setValue(this.name);
    this.businessForm?.get('shortName')?.setValue(this.shortName);
    this.businessForm?.get('taxCode')?.setValue(this.taxCode);
    this.businessForm?.get('email')?.setValue(this.email);
    this.businessForm?.get('phone')?.setValue(this.phone);
    this.businessForm?.get('address')?.setValue(this.address);
    this.businessForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
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

  onEdit() {
    this.submitted = true;
    if (this.businessForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.businessForm.value.name.trim(),
          shortName: this.businessForm.value.shortName.trim(),
          taxCode: this.businessForm.value.taxCode.trim(),
          email: this.businessForm.value.email.trim(),
          phone: this.businessForm.value.phone.trim(),
          address: this.businessForm.value.address.trim(),
          isActive: this.businessForm.value.isActive,
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
