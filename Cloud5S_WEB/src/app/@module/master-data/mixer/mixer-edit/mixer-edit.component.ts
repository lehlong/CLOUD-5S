import {Component} from '@angular/core';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MixerFilter} from 'src/app/@filter/MD/mixer.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Component({
  selector: 'app-mixer-edit',
  templateUrl: './mixer-edit.component.html',
  styleUrls: ['./mixer-edit.component.scss'],
})
export class MixerEditComponent {
  mixerForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  
  isActive: boolean | null = null;
  filter = new MixerFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: MixerService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.mixerForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.mixerForm.controls;
  }

  ngOnInit() {
    this.mixerForm?.get('code')?.setValue(this.code);
    this.mixerForm?.get('name')?.setValue(this.name);
    this.mixerForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.mixerForm?.get('code')?.setValue('');
    this.mixerForm?.get('name')?.setValue('');
    this.mixerForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.mixerForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.mixerForm.value.name.trim(),
          isActive: this.mixerForm.value.isActive,
        },
        )
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
