import {Component} from '@angular/core';
import {WorkingShiftService} from 'src/app/services/MD/working-shift.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {WorkingShiftFilter} from 'src/app/@filter/MD/working-shift.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {WORKINGSHIFT_RIGHTS} from 'src/app/utils/constant/index';
import * as moment from 'moment';
@Component({
  selector: 'app-working-shift-edit',
  templateUrl: './working-shift-edit.component.html',
  styleUrls: ['./working-shift-edit.component.scss'],
})
export class WorkingShiftEditComponent {
  wksForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  code: string = '';
  startTime: string = '';
  endTime: string = '';
  description: string = '';
  ordinalNumber: number = 0;
  isActive: boolean | null = null;
  filter = new WorkingShiftFilter();
  optionsGroup: optionsGroup[] = [];
  WORKINGSHIFT_RIGHTS = WORKINGSHIFT_RIGHTS;
  filterGroup = new BaseFilter();

  constructor(
    private _service: WorkingShiftService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.wksForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      startTime: ['', [Validators.required, this.utils.trimSpace]],
      endTime: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      ordinalNumber: ['', [Validators.required, Validators.min(1)]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.wksForm.controls;
  }

  ngOnInit() {
    this.wksForm?.get('code')?.setValue(this.code);
    this.wksForm?.get('name')?.setValue(this.name);
    this.wksForm?.get('startTime')?.setValue(this.startTime);
    this.wksForm?.get('endTime')?.setValue(this.endTime);
    this.wksForm?.get('isActive')?.setValue(this.isActive || false);
    this.wksForm?.get('ordinalNumber')?.setValue(this.ordinalNumber);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      startTime: '',
      endTime: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.wksForm?.get('code')?.setValue('');
    this.wksForm?.get('name')?.setValue('');
    this.wksForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.wksForm.invalid) {
      return;
    }
    let _objUpdate;
    if (this.wksForm.value.startTime.split(':').length == 3 && this.wksForm.value.endTime.split(':').length != 3) {
      _objUpdate = {
        ...this.wksForm.value,
        code: this.code,
        fromHour: this.wksForm.value.startTime,
        toHour: this.wksForm.value.endTime + ':00',
      };
      delete _objUpdate.startTime;
      delete _objUpdate.endTime;
    } else if (
      this.wksForm.value.endTime.split(':').length == 3 &&
      this.wksForm.value.startTime.split(':').length != 3
    ) {
      _objUpdate = {
        ...this.wksForm.value,
        code: this.code,
        fromHour: this.wksForm.value.startTime + ':00',
        toHour: this.wksForm.value.endTime,
      };
      delete _objUpdate.startTime;
      delete _objUpdate.endTime;
    } else if (
      this.wksForm.value.endTime.split(':').length == 3 &&
      this.wksForm.value.startTime.split(':').length == 3
    ) {
      _objUpdate = {
        ...this.wksForm.value,
        code: this.code,
        fromHour: this.wksForm.value.startTime,
        toHour: this.wksForm.value.endTime,
      };
      delete _objUpdate.startTime;
      delete _objUpdate.endTime;
    } else {
      _objUpdate = {
        ...this.wksForm.value,
        code: this.code,
        fromHour: this.wksForm.value.startTime + ':00',
        toHour: this.wksForm.value.endTime + ':00',
      };
      delete _objUpdate.startTime;
      delete _objUpdate.endTime;
    }

    this._service.Update(_objUpdate).subscribe(
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
