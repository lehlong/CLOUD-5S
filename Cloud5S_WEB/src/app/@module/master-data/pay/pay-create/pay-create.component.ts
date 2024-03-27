import {Component} from '@angular/core';
import {PayTypeService} from 'src/app/services/MD/pay-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {PAYTYPE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-pay-create',
  templateUrl: './pay-create.component.html',
  styleUrls: ['./pay-create.component.scss'],
})
export class PayCreateComponent {
  payForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  PAYTYPE_RIGHTS = PAYTYPE_RIGHTS;

  constructor(
    private _service: PayTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.payForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      note: ['', [, this.utils.trimSpace]],

      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.payForm.controls;
  }

  close() {
    this.drawerService.close();
    this.payForm?.get('name')?.setValue('');
    this.payForm?.get('note')?.setValue('');

    this.payForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.payForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          name: this.payForm.value.name.trim(),
          note: this.payForm.value.note.trim(),
          isActive: this.payForm.value.isActive,
        },
        false,
      )
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
