import {Component} from '@angular/core';
import {IncomeTypeService} from 'src/app/services/MD/in-come.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {INCOMETYPE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-in-come-create',
  templateUrl: './in-come-create.component.html',
  styleUrls: ['./in-come-create.component.scss'],
})
export class InComeCreateComponent {
  incomeForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  INCOMETYPE_RIGHTS = INCOMETYPE_RIGHTS;

  constructor(
    private _service: IncomeTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.incomeForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      note: ['', [, this.utils.trimSpace]],

      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.incomeForm.controls;
  }

  close() {
    this.drawerService.close();
    this.incomeForm?.get('name')?.setValue('');
    this.incomeForm?.get('note')?.setValue('');

    this.incomeForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.incomeForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          name: this.incomeForm.value.name.trim(),
          note: this.incomeForm.value.note.trim(),

          isActive: this.incomeForm.value.isActive,
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
