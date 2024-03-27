import {Component} from '@angular/core';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {VehicleTypeService} from 'src/app/services/MD/vehicle-type.service';
import {UnitService} from 'src/app/services/MD/unit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {EROLE_CODES, VEHICLE_RIGHTS} from 'src/app/utils/constant/index';
import {AccountService} from 'src/app/services/AD/account.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss'],
})
export class VehicleCreateComponent {
  vehicleForm: FormGroup;
  submitted: boolean = false;
  selectedItem: string = '';
  vehicleTypes: any = [];
  units: any = [];
  accounts: any[] = [];
  VEHICLE_RIGHTS = VEHICLE_RIGHTS;

  constructor(
    private _service: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private UnitService: UnitService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropDownService: DropdownService,
  ) {
    this.vehicleForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\S+$/), this.utils.trimSpace]],
      tonnage: ['', [Validators.required, Validators.min(1), this.utils.trimSpace]],
      unladenWeight: ['', [Validators.required, Validators.min(1), this.utils.trimSpace]],
      driverUserName: ['', [Validators.required]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      unitCode: ['', [Validators.required, this.utils.trimSpace]],
      isActive: 'true',
    });
  }

  ngOnInit() {
    this.vehicleTypeService.getAll().subscribe((result: any) => {
      this.vehicleTypes = result.data;
    });

    this.UnitService.getAll().subscribe((result: any) => {
      this.units = result.data;
    });
    this.dropDownService.GetAllCreateby({RoleCode: EROLE_CODES.LAI_XE}).subscribe((accountsResponse: any) => {
      this.accounts = accountsResponse.data;
      console.log(this.accounts);
    });
  }

  get f() {
    return this.vehicleForm.controls;
  }

  close() {
    this.drawerService.close();
    this.vehicleForm?.get('code')?.setValue('');
    this.vehicleForm?.get('tonnage')?.setValue('');
    this.vehicleForm?.get('driverUserName')?.setValue('');
    this.vehicleForm?.get('isActive')?.setValue('true');
    this.vehicleForm?.get('typeCode')?.setValue('');
    this.vehicleForm?.get('unladenWeight')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    this.vehicleForm.setValue({
      ...this.vehicleForm.value,
      code: this.vehicleForm.value.code.trim(),
    });

    if (this.vehicleForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.vehicleForm.value.code.trim().toUpperCase(),
        tonnage: this.vehicleForm.value.tonnage,
        driverUserName: this.vehicleForm.value.driverUserName,
        isActive: this.vehicleForm.value.isActive === 'true',
        typeCode: this.vehicleForm.value.typeCode,
        unitCode: this.vehicleForm.value.unitCode,
        unladenWeight: this.vehicleForm.value.unladenWeight,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.vehicleForm?.get('code')?.setValue('');
          // this.vehicleForm?.get('tonnage')?.setValue('');
          // this.vehicleForm?.get('driverUserName')?.setValue('');
          // this.vehicleForm?.get('isActive')?.setValue('true');
          // this.vehicleForm?.get('typeCode')?.setValue('');
          // this.vehicleForm?.get('unladenWeight')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
