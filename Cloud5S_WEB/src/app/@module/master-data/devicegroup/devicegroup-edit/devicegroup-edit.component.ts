import {Component} from '@angular/core';
import {DeviceGroupService} from 'src/app/services/MD/device-group.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DeviceGroupFilter} from 'src/app/@filter/MD/device-group.filter';
import {optionsGroup} from 'src/app/@filter/MD/device-group.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DEVICEGROUP_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-devicegroup-edit',
  templateUrl: './devicegroup-edit.component.html',
  styleUrls: ['./devicegroup-edit.component.scss'],
})
export class DevicegroupEditComponent {
  deviceGroupForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  filter = new DeviceGroupFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  DEVICEGROUP_RIGHTS = DEVICEGROUP_RIGHTS;
  constructor(
    private _service: DeviceGroupService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.deviceGroupForm = this._fb.group({
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
    return this.deviceGroupForm.controls;
  }

  ngOnInit() {
    this.deviceGroupForm?.get('code')?.setValue(this.code);
    this.deviceGroupForm?.get('name')?.setValue(this.name);
    this.deviceGroupForm?.get('isActive')?.setValue(this.isActive || false);
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
    if (this.deviceGroupForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.deviceGroupForm.value.name.trim(),
          isActive: this.deviceGroupForm.value.isActive,
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
