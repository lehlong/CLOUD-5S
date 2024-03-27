import {Component} from '@angular/core';
import {VehicleTypeService} from 'src/app/services/MD/vehicle-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {VEHICLETYPE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-vehicle-type-create',
  templateUrl: './vehicle-type-create.component.html',
  styleUrls: ['./vehicle-type-create.component.scss'],
})
export class VehicleTypeCreateComponent {
  vehicleTypeForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  VEHICLETYPE_RIGHTS = VEHICLETYPE_RIGHTS;

  constructor(
    private _service: VehicleTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.vehicleTypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.vehicleTypeForm.controls;
  }

  close() {
    this.drawerService.close();
    this.vehicleTypeForm?.get('code')?.setValue('');
    this.vehicleTypeForm?.get('name')?.setValue('');
    this.vehicleTypeForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.vehicleTypeForm.setValue({
      ...this.vehicleTypeForm.value,
      code: this.vehicleTypeForm.value.code.trim(),
    });
    if (this.vehicleTypeForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.vehicleTypeForm.value.code.trim(),
        name: this.vehicleTypeForm.value.name.trim(),
        isActive: this.vehicleTypeForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.vehicleTypeForm?.get('code')?.setValue('');
          // this.vehicleTypeForm?.get('name')?.setValue('');
          // this.vehicleTypeForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
