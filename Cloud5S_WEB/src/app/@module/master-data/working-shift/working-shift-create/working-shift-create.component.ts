import {Component} from '@angular/core';
import {WorkingShiftService} from 'src/app/services/MD/working-shift.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {WORKINGSHIFT_RIGHTS} from 'src/app/utils/constant/index';
import * as moment from 'moment';
@Component({
  selector: 'app-working-shift-create',
  templateUrl: './working-shift-create.component.html',
  styleUrls: ['./working-shift-create.component.scss'],
})
export class WorkingShiftCreateComponent {
  wksForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  WORKINGSHIFT_RIGHTS = WORKINGSHIFT_RIGHTS;

  constructor(
    private _service: WorkingShiftService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.wksForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      startTime: ['', [Validators.required, this.utils.trimSpace]],
      endTime: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      ordinalNumber: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get f() {
    return this.wksForm.controls;
  }

  close() {
    this.drawerService.close();
    this.wksForm?.get('code')?.setValue('');
    this.wksForm?.get('name')?.setValue('');
    this.wksForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.wksForm.setValue({
      ...this.wksForm.value,
      code: this.wksForm.value.code.trim(),
    });

    if (this.wksForm.invalid) {
      return;
    }
    let _startTime = this.wksForm.value.startTime + ':00';
    let _endTime = this.wksForm.value.endTime + ':00';

    let objInsert = {
      code: this.wksForm.value.code.trim(),
      name: this.wksForm.value.name.trim(),
      ordinalNumber: this.wksForm.value.ordinalNumber,
      fromHour: _startTime,
      toHour: _endTime,
      isActive: this.wksForm.value.isActive,
      description: null,
    };

    this._service.Insert(objInsert).subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
        // this.wksForm?.get('code')?.setValue('');
        // this.wksForm?.get('name')?.setValue('');
        // this.wksForm?.get('isActive')?.setValue(true);
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
