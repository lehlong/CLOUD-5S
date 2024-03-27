import {Component} from '@angular/core';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {VehicleTypeService} from 'src/app/services/MD/vehicle-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {VehicleFilter} from 'src/app/@filter/MD/vehicle.filter';
import {UnitService} from 'src/app/services/MD/unit.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {EROLE_CODES, VEHICLE_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss'],
})
export class VehicleEditComponent {
  vehicleForm: FormGroup;
  submitted: boolean = false;
  unladenWeight: number = 0;
  code: string = '';
  unitCode: string = '';
  tonnage: number = 0;
  driverUserName: string = '';
  VEHICLE_RIGHTS = VEHICLE_RIGHTS;
  typeCode: string = '';
  units: any = [];
  isActive: boolean | null = null;
  selectedItem: string = '';
  vehicleTypes: any = [];
  accounts: any = [];
  filter = new VehicleFilter();

  constructor(
    private _service: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private UnitService: UnitService,
    private drawerService: DrawerService,
    private _service1: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.vehicleForm = this._fb.group({
      code: [{value: '', disabled: true}],
      driverUserName: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      unitCode: ['', [Validators.required, this.utils.trimSpace]],
      tonnage: ['', [Validators.required, Validators.min(1)]],
      unladenWeight: ['', [Validators.required, Validators.min(1)]],
      isActive: ['true', [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.vehicleForm.controls;
  }

  ngOnInit() {
    this._service1.GetAllCreateby({RoleCode: EROLE_CODES.LAI_XE}).subscribe((result: any) => {
      this.accounts = result.data;
    });
    this.UnitService.getAll().subscribe((result: any) => {
      this.units = result.data;
    });
    this.vehicleForm?.get('code')?.setValue(this.code);
    this.vehicleForm?.get('driverUserName')?.setValue(this.driverUserName);
    this.vehicleForm?.get('typeCode')?.setValue(this.typeCode);
    this.vehicleForm?.get('tonnage')?.setValue(this.tonnage);
    this.vehicleForm?.get('unitCode')?.setValue(this.unitCode);
    this.vehicleForm?.get('isActive')?.setValue(this.isActive);
    this.vehicleForm?.get('unladenWeight')?.setValue(this.unladenWeight);
  }

  ngAfterViewInit() {
    this.vehicleTypeService.getAll().subscribe((result: any) => {
      this.vehicleTypes = result.data;
    });
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      typeCode: '',
      unitCode: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),

        typeCode: this.vehicleForm.value.typeCode.trim(),
        tonnage: this.vehicleForm.value.tonnage,
        unitCode: this.vehicleForm.value.unitCode,
        unladenWeight: this.vehicleForm.value.unladenWeight,
        isActive: this.vehicleForm.value.isActive,
        driverUserName: this.vehicleForm.value.driverUserName,
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
