import {Component} from '@angular/core';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
@Component({
  selector: 'app-mixer-create',
  templateUrl: './mixer-create.component.html',
  styleUrls: ['./mixer-create.component.scss'],
})
export class MixerCreateComponent {
  mixerForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: MixerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.mixerForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.mixerForm.controls;
  }

  close() {
    this.drawerService.close();
    this.mixerForm?.get('code')?.setValue('');
    this.mixerForm?.get('name')?.setValue('');
    this.mixerForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.mixerForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          code: this.mixerForm.value.code.trim(),
          name: this.mixerForm.value.name.trim(),
          isActive: this.mixerForm.value.isActive,
        },
        )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.mixerForm?.get('code')?.setValue('');
          // this.mixerForm?.get('name')?.setValue('');
          // this.mixerForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
