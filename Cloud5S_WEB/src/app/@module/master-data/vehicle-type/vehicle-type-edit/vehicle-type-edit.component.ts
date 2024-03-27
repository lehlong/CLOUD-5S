import {Component} from '@angular/core';
import {VehicleTypeService} from 'src/app/services/MD/vehicle-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {VehicleTypeFilter} from 'src/app/@filter/MD/vehicle-type.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {VEHICLETYPE_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-vehicle-type-edit',
  templateUrl: './vehicle-type-edit.component.html',
  styleUrls: ['./vehicle-type-edit.component.scss'],
})
export class VehicleTypeEditComponent {
  vehicleTypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  filter = new VehicleTypeFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  VEHICLETYPE_RIGHTS = VEHICLETYPE_RIGHTS;

  constructor(
    private _service: VehicleTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.vehicleTypeForm = this._fb.group({
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
    return this.vehicleTypeForm.controls;
  }

  ngOnInit() {
    this.vehicleTypeForm?.get('code')?.setValue(this.code);
    this.vehicleTypeForm?.get('name')?.setValue(this.name);
    this.vehicleTypeForm?.get('isActive')?.setValue(this.isActive || false);
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
    this.vehicleTypeForm?.get('code')?.setValue('');
    this.vehicleTypeForm?.get('name')?.setValue('');
    this.vehicleTypeForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.vehicleTypeForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.vehicleTypeForm.value.name.trim(),
          isActive: this.vehicleTypeForm.value.isActive,
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
