import {Component} from '@angular/core';
import {DeviceTypeService} from 'src/app/services/MD/device-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/device-type.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DEVICETYPE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-device-type-create',
  templateUrl: './device-type-create.component.html',
  styleUrls: ['./device-type-create.component.scss'],
})
export class DeviceTypeCreateComponent {
  devicetypeForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  DEVICETYPE_RIGHTS = DEVICETYPE_RIGHTS;

  constructor(
    private _service: DeviceTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.devicetypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.devicetypeForm.controls;
  }

  close() {
    this.drawerService.close();
    this.devicetypeForm?.get('code')?.setValue('');
    this.devicetypeForm?.get('name')?.setValue('');
    this.devicetypeForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.devicetypeForm.setValue({
      ...this.devicetypeForm.value,
      code: this.devicetypeForm.value.code.trim(),
    });
    if (this.devicetypeForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.devicetypeForm.value.code.trim(),
        name: this.devicetypeForm.value.name.trim(),
        isActive: this.devicetypeForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.devicetypeForm?.get('code')?.setValue('');
          // this.devicetypeForm?.get('name')?.setValue('');
          // this.devicetypeForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
