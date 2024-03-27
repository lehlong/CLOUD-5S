import {Component} from '@angular/core';
import {DeviceService} from 'src/app/services/MD/device.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DeviceFilter} from 'src/app/@filter/MD/device.filter';
import {optionsGroup} from 'src/app/@filter/MD/device.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss'],
})
export class DeviceEditComponent {
  deviceForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  typeCode: string = '';
  groupCode: string = '';
  ipAddress: string = '';
  ipPort: string | number = '';
  devicePort: string | number = '';
  username: string = '';
  password: string = '';
  selectedItem: string = '';
  typeCodes: any[] = [];
  groupCodes: any[] = [];
  filter = new DeviceFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: DeviceService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private _service1: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.deviceForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      groupCode: ['', [Validators.required, this.utils.trimSpace]],
      ipAddress: ['', [Validators.required, this.utils.trimSpace]],
      ipPort: ['', [Validators.required]],
      devicePort: ['', [Validators.required]],
      username: ['', [Validators.required, this.utils.trimSpace]],
      password: ['', [Validators.required, this.utils.trimSpace]],
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
    return this.deviceForm.controls;
  }

  ngOnInit() {
    this._service1.GetAllDeviceGroup().subscribe((result: any) => {
      this.groupCodes = result.data;
    });
    this._service1.GetAllDeviceType().subscribe((result: any) => {
      this.typeCodes = result.data;
    });
    this.deviceForm?.get('code')?.setValue(this.code);
    this.deviceForm?.get('name')?.setValue(this.name);
    this.deviceForm?.get('typeCode')?.setValue(this.typeCode);
    this.deviceForm?.get('groupCode')?.setValue(this.groupCode);
    this.deviceForm?.get('ipAddress')?.setValue(this.ipAddress);
    this.deviceForm?.get('ipPort')?.setValue(this.ipPort);
    this.deviceForm?.get('devicePort')?.setValue(this.devicePort);
    this.deviceForm?.get('username')?.setValue(this.username);
    this.deviceForm?.get('password')?.setValue(this.password);
    this.deviceForm?.get('isActive')?.setValue(this.isActive);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      typeCode: '',
      groupCode: '',
      ipAddress: '',
      ipPort: '',
      devicePort: '',
      username: '',
      password: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.deviceForm.invalid) {
      return;
    }

    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.deviceForm.value.name.trim(),
          isActive: this.deviceForm.value.isActive,
          typeCode: this.deviceForm.value.typeCode,
          groupCode: this.deviceForm.value.groupCode,
          ipAddress: this.deviceForm.value.ipAddress.trim(),
          ipPort: this.deviceForm.value.ipPort,
          devicePort: this.deviceForm.value.devicePort,
          username: this.deviceForm.value.username.trim(),
          password: this.deviceForm.value.password.trim(),
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
