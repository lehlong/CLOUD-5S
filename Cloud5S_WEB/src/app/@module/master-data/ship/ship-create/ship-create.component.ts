import {Component} from '@angular/core';
import {ShipService} from 'src/app/services/MD/ship.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {SHIP_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-ship-create',
  templateUrl: './ship-create.component.html',
  styleUrls: ['./ship-create.component.scss'],
})
export class ShipCreateComponent {
  shipForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  SHIP_RIGHTS = SHIP_RIGHTS;

  constructor(
    private _service: ShipService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.shipForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      tonage: ['', [Validators.required, Validators.min(1)]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.shipForm.controls;
  }

  close() {
    this.drawerService.close();
    this.shipForm?.get('code')?.setValue('');
    this.shipForm?.get('name')?.setValue('');
    this.shipForm?.get('tonage')?.setValue('');
    this.shipForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.shipForm.setValue({
      ...this.shipForm.value,
      code: this.shipForm.value.code.trim(),
    });
    if (this.shipForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.shipForm.value.code.trim(),
        name: this.shipForm.value.name.trim(),
        tonage: this.shipForm.value.tonage,
        isActive: this.shipForm.value.isActive,
      })
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
