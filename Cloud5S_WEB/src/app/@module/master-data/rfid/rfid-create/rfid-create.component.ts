import {Component} from '@angular/core';
import {RfidService} from 'src/app/services/MD/rfid.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ITEMTYPE_RIGHTS} from 'src/app/utils/constant/index';
import {RFID_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-rfid-create',
  templateUrl: './rfid-create.component.html',
  styleUrls: ['./rfid-create.component.scss'],
})
export class RfidCreateComponent {
  rfidForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  ITEMTYPE_RIGHTS = ITEMTYPE_RIGHTS;

  vehicles: any[] = [];
  RFID_RIGHTS = RFID_RIGHTS;

  constructor(
    private _service: RfidService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
  ) {
    this.rfidForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      vehicleCode: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.GetAllVehicle();
  }

  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe((result: any) => {
      this.vehicles = result.data;
    });
  }

  get f() {
    return this.rfidForm.controls;
  }

  close() {
    this.drawerService.close();
    this.rfidForm?.get('code')?.setValue('');
    this.rfidForm?.get('vehicleCode')?.setValue('');
    this.rfidForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    this.rfidForm.setValue({
      ...this.rfidForm.value,
      code: this.rfidForm.value.code.trim(),
    });
    if (this.rfidForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.rfidForm.value.code.trim(),
        vehicleCode: this.rfidForm.value.vehicleCode,
        isActive: this.rfidForm.value.isActive,
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
