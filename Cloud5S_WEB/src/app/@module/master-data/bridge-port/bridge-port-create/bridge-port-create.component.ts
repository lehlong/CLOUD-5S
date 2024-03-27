import {Component} from '@angular/core';
import {BridgePortService} from 'src/app/services/MD/bridge-port.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {BRIDGE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-bridge-port-create',
  templateUrl: './bridge-port-create.component.html',
  styleUrls: ['./bridge-port-create.component.scss'],
})
export class BridgePortCreateComponent {
  bridgeportForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  BRIDGE_RIGHTS = BRIDGE_RIGHTS;

  constructor(
    private _service: BridgePortService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.bridgeportForm = this._fb.group({
      code: ['', [Validators.required, , Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.bridgeportForm.controls;
  }

  close() {
    this.drawerService.close();
    this.bridgeportForm?.get('code')?.setValue('');
    this.bridgeportForm?.get('name')?.setValue('');
    this.bridgeportForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.bridgeportForm.setValue({
      ...this.bridgeportForm.value,
      code: this.bridgeportForm.value.code.trim(),
    });
    if (this.bridgeportForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.bridgeportForm.value.code.trim(),
        name: this.bridgeportForm.value.name.trim(),
        isActive: this.bridgeportForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.areaForm?.get('code')?.setValue('');
          // this.areaForm?.get('name')?.setValue('');
          // this.areaForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
