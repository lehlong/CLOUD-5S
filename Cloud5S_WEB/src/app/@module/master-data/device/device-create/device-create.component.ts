import {Component} from '@angular/core';
import {DeviceService} from 'src/app/services/MD/device.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductFilter} from 'src/app/@filter/MD/product.filter';
import {DropdownService} from 'src/app/services/Common/dropdown.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.scss'],
})
export class DeviceCreateComponent {
  deviceForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  typeCodes: any[] = [];
  groupCodes: any[] = [];
  selectedItem: string = '';

  constructor(
    private _service: DeviceService,
    private _fb: FormBuilder,
    private utils: utils,
    private _service1: DropdownService,
    private drawerService: DrawerService,
  ) {
    this.deviceForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      groupCode: ['', [Validators.required, this.utils.trimSpace]],
      ipAddress: ['', [Validators.required, this.utils.trimSpace]],
      ipPort: ['', [Validators.required]],
      devicePort: ['', [Validators.required]],
      username: ['', [Validators.required, this.utils.trimSpace]],
      password: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.deviceForm.controls;
  }

  close() {
    this.drawerService.close();
    this.deviceForm?.get('code')?.setValue('');
    this.deviceForm?.get('name')?.setValue('');
    this.deviceForm?.get('typeCode')?.setValue('');
    this.deviceForm?.get('groupCode')?.setValue('');
    this.deviceForm?.get('ipAddress')?.setValue('');
    this.deviceForm?.get('ipPort')?.setValue('');
    this.deviceForm?.get('devicePort')?.setValue('');
    this.deviceForm?.get('username')?.setValue('');
    this.deviceForm?.get('password')?.setValue('');
    this.deviceForm?.get('isActive')?.setValue(true);
  }

  ngOnInit() {
    this._service1.GetAllDeviceGroup().subscribe((result: any) => {
      this.groupCodes = result.data;
    });
    this._service1.GetAllDeviceType().subscribe((result: any) => {
      this.typeCodes = result.data;
    });
  }

  onCreate() {
    this.submitted = true;
    this.deviceForm.setValue({
      ...this.deviceForm.value,
      code: this.deviceForm.value.code.trim(),
    });
    if (this.deviceForm.invalid) {
      return;
    }
    console.log(this.deviceForm.value);

    this._service
      .Insert({
        code: this.deviceForm.value.code.trim(),
        name: this.deviceForm.value.name.trim(),
        typeCode: this.deviceForm.value.typeCode.trim(),
        groupCode: this.deviceForm.value.groupCode.trim(),
        ipAddress: this.deviceForm.value.ipAddress.trim(),
        ipPort: this.deviceForm.value.ipPort,
        devicePort: this.deviceForm.value.devicePort,
        username: this.deviceForm.value.username.trim(),
        password: this.deviceForm.value.password.trim(),
        isActive: this.deviceForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.deviceForm?.get('code')?.setValue('');
          // this.deviceForm?.get('name')?.setValue('');
          // this.deviceForm?.get('typeCode')?.setValue('');
          // this.deviceForm?.get('groupCode')?.setValue('');
          // this.deviceForm?.get('ipAddress')?.setValue('');
          // this.deviceForm?.get('ipPort')?.setValue('');
          // this.deviceForm?.get('devicePort')?.setValue('');
          // this.deviceForm?.get('username')?.setValue('');
          // this.deviceForm?.get('password')?.setValue('');
          // this.deviceForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
