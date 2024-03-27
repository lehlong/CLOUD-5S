import {Component} from '@angular/core';
import {PurchasingstationService} from 'src/app/services/MD/purchasing-station.service';
import {AreaService} from 'src/app/services/MD/area.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Component({
  selector: 'app-purchasing-station-create',
  templateUrl: './purchasing-station-create.component.html',
  styleUrls: ['./purchasing-station-create.component.scss'],
})
export class PurchasingStationCreateComponent {
  purchasingstationForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  areas: any = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: PurchasingstationService,
    private AreaService: AreaService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.purchasingstationForm = this._fb.group({
      code: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      areaCode: ['', [Validators.required, this.utils.trimSpace]],
      address: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],

      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.purchasingstationForm.controls;
  }

  close() {
    this.drawerService.close();
    this.purchasingstationForm?.get('code')?.setValue('');
    this.purchasingstationForm?.get('name')?.setValue('');
    this.purchasingstationForm?.get('areaCode')?.setValue('');
    this.purchasingstationForm?.get('address')?.setValue('');
    this.purchasingstationForm?.get('phoneNumber')?.setValue('');
    this.purchasingstationForm?.get('isActive')?.setValue(true);
  }
  ngOnInit() {
    this.AreaService.getAll().subscribe((result: any) => {
      this.areas = result.data;
    });
  }

  onCreate() {
    this.submitted = true;
    if (this.purchasingstationForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.purchasingstationForm.value.code.trim(),
        name: this.purchasingstationForm.value.name.trim(),
        areaCode: this.purchasingstationForm.value.areaCode.trim(),
        address: this.purchasingstationForm.value.address.trim(),
        phoneNumber: this.purchasingstationForm.value.phoneNumber.trim(),
        isActive: this.purchasingstationForm.value.isActive,
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
