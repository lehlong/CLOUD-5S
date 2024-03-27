import {Component} from '@angular/core';
import {DeviceTypeService} from 'src/app/services/MD/device-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DeviceTypeFilter} from 'src/app/@filter/MD/device-type.filter';
import {optionsGroup} from 'src/app/@filter/MD/device-type.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DEVICETYPE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-device-type-edit',
  templateUrl: './device-type-edit.component.html',
  styleUrls: ['./device-type-edit.component.scss'],
})
export class DeviceTypeEditComponent {
  devicetypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  filter = new DeviceTypeFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  DEVICETYPE_RIGHTS = DEVICETYPE_RIGHTS;

  constructor(
    private _service: DeviceTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.devicetypeForm = this._fb.group({
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
    return this.devicetypeForm.controls;
  }

  ngOnInit() {
    this.devicetypeForm?.get('code')?.setValue(this.code);
    this.devicetypeForm?.get('name')?.setValue(this.name);
    this.devicetypeForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.devicetypeForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
        name: this.devicetypeForm.value.name.trim(),
        isActive: this.devicetypeForm.value.isActive,
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
