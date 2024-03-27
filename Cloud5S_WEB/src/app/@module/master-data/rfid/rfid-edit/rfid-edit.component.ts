import {Component} from '@angular/core';
import {RfidService} from 'src/app/services/MD/rfid.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {rfidFilter} from 'src/app/@filter/MD/rfid.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ITEMTYPE_RIGHTS} from 'src/app/utils/constant/index';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {RFID_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-rfid-edit',
  templateUrl: './rfid-edit.component.html',
  styleUrls: ['./rfid-edit.component.scss'],
})
export class RfidEditComponent {
  rfidForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  vehicleCode: string = '';
  isActive: boolean | null = null;
  filter = new rfidFilter();
  optionsGroup: optionsGroup[] = [];
  ITEMTYPE_RIGHTS = ITEMTYPE_RIGHTS;
  filterGroup = new BaseFilter();
  vehicles: any[] = [];
  RFID_RIGHTS = RFID_RIGHTS;

  constructor(
    private _service: RfidService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownService: DropdownService,
  ) {
    this.rfidForm = this._fb.group({
      code: [{value: '', disabled: true}],
      vehicleCode: ['', [Validators.required, this.utils.trimSpace]],
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
    return this.rfidForm.controls;
  }

  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe((result: any) => {
      this.vehicles = result.data;
    });
  }
  ngOnInit() {
    this.GetAllVehicle();
    this.rfidForm?.get('code')?.setValue(this.code);
    this.rfidForm?.get('vehicleCode')?.setValue(this.vehicleCode);
    this.rfidForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      vehicleCode: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.rfidForm?.get('code')?.setValue('');
    this.rfidForm?.get('vehicleCode')?.setValue('');
    this.rfidForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.rfidForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
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
