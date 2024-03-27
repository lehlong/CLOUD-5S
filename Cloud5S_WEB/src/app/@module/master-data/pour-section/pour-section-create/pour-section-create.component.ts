import {Component} from '@angular/core';
import {PourSectionService} from 'src/app/services/MD/pour-section.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/pour-section.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {POURSECTION_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-pour-section-create',
  templateUrl: './pour-section-create.component.html',
  styleUrls: ['./pour-section-create.component.scss'],
})
export class PourSectionCreateComponent {
  poursectionForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  POURSECTION_RIGHTS = POURSECTION_RIGHTS;

  constructor(
    private _service: PourSectionService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.poursectionForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.poursectionForm.controls;
  }

  close() {
    this.drawerService.close();
    this.poursectionForm?.get('code')?.setValue('');
    this.poursectionForm?.get('name')?.setValue('');
    this.poursectionForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.poursectionForm.setValue({
      ...this.poursectionForm.value,
      code: this.poursectionForm.value.code.trim(),
    });
    if (this.poursectionForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.poursectionForm.value.code.trim(),
        name: this.poursectionForm.value.name.trim(),
        isActive: this.poursectionForm.value.isActive,
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
