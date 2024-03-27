import {Component} from '@angular/core';
import {ChipperService} from 'src/app/services/MD/chipper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {CHIPPER_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-chipper-create',
  templateUrl: './chipper-create.component.html',
  styleUrls: ['./chipper-create.component.scss'],
})
export class ChipperCreateComponent {
  chipperForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  CHIPPER_RIGHTS = CHIPPER_RIGHTS;

  constructor(
    private _service: ChipperService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.chipperForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.chipperForm.controls;
  }

  close() {
    this.drawerService.close();
    this.chipperForm?.get('name')?.setValue('');
    this.chipperForm?.get('code')?.setValue('');
    this.chipperForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.chipperForm.setValue({
      ...this.chipperForm.value,
      code: this.chipperForm.value.code.trim(),
    });
    if (this.chipperForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.chipperForm.value.code.trim(),
        name: this.chipperForm.value.name.trim(),
        isActive: this.chipperForm.value.isActive,
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
