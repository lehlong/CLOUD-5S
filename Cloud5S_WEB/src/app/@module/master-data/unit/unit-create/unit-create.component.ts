import {Component, ViewChild} from '@angular/core';
import {UnitService} from 'src/app/services/MD/unit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {UNIT_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-unit-create',
  templateUrl: './unit-create.component.html',
  styleUrls: ['./unit-create.component.scss'],
})
export class UnitCreateComponent {
  unitForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  UNIT_RIGHTS = UNIT_RIGHTS;

  constructor(
    private _service: UnitService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.unitForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.unitForm.controls;
  }

  close() {
    this.drawerService.close();
    this.unitForm?.get('code')?.setValue('');
    this.unitForm?.get('name')?.setValue('');
    this.unitForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;

    this.unitForm.setValue({
      ...this.unitForm.value,
      code: this.unitForm.value.code.trim(),
    });
    if (this.unitForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.unitForm.value.code.trim(),
        name: this.unitForm.value.name.trim(),
        isActive: this.unitForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.unitForm?.get('code')?.setValue('');
          // this.unitForm?.get('name')?.setValue('');
          // this.unitForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
