import {Component} from '@angular/core';
import {DeviceGroupService} from 'src/app/services/MD/device-group.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/department.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DEVICEGROUP_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-devicegroup-create',
  templateUrl: './devicegroup-create.component.html',
  styleUrls: ['./devicegroup-create.component.scss'],
})
export class DevicegroupCreateComponent {
  deviceGroupForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  DEVICEGROUP_RIGHTS = DEVICEGROUP_RIGHTS;

  constructor(
    private _service: DeviceGroupService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.deviceGroupForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.deviceGroupForm.controls;
  }

  close() {
    this.drawerService.close();
    this.deviceGroupForm?.get('code')?.setValue('');
    this.deviceGroupForm?.get('name')?.setValue('');
    this.deviceGroupForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.deviceGroupForm.setValue({
      ...this.deviceGroupForm.value,
      code: this.deviceGroupForm.value.code.trim(),
    });
    if (this.deviceGroupForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.deviceGroupForm.value.code.trim(),
        name: this.deviceGroupForm.value.name.trim(),
        isActive: this.deviceGroupForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.deviceGroupForm?.get('code')?.setValue('');
          // this.deviceGroupForm?.get('name')?.setValue('');
          // this.deviceGroupForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
