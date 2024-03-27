import {Component} from '@angular/core';
import {PurchasingstationService} from 'src/app/services/MD/purchasing-station.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {AreaService} from 'src/app/services/MD/area.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PurchasingstationFilter} from 'src/app/@filter/MD/purchasingstation.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Component({
  selector: 'app-purchasing-station-edit',
  templateUrl: './purchasing-station-edit.component.html',
  styleUrls: ['./purchasing-station-edit.component.scss'],
})
export class PurchasingStationEditComponent {
  purchasingstationForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  areaCode: string = '';
  areas: any = [];
  address: string = '';
  phoneNumber: string = '';

  isActive: boolean | null = null;
  filter = new PurchasingstationFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: PurchasingstationService,
    private _fb: FormBuilder,
    private AreaService: AreaService,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.purchasingstationForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      areaCode: ['', [Validators.required, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],
      address: ['', [Validators.required, this.utils.trimSpace]],
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
    return this.purchasingstationForm.controls;
  }

  ngOnInit() {
    this.purchasingstationForm?.get('code')?.setValue(this.code);
    this.purchasingstationForm?.get('name')?.setValue(this.name);
    this.purchasingstationForm?.get('areaCode')?.setValue(this.areaCode);
    this.purchasingstationForm?.get('phoneNumber')?.setValue(this.phoneNumber);
    this.purchasingstationForm?.get('address')?.setValue(this.address);
    this.purchasingstationForm?.get('isActive')?.setValue(this.isActive || false);
  }

  ngAfterViewInit() {
    this.AreaService.getAll().subscribe((result: any) => {
      this.areas = result.data;
    });
  }
  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      address: '',
      phoneNumber: '',
      areaCode: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.purchasingstationForm?.get('code')?.setValue('');
    this.purchasingstationForm?.get('name')?.setValue('');
    this.purchasingstationForm?.get('areaCode')?.setValue('');
    this.purchasingstationForm?.get('address')?.setValue('');
    this.purchasingstationForm?.get('phoneNumber')?.setValue('');
    this.purchasingstationForm?.get('isActive')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.purchasingstationForm.invalid) {
      return;
    }

    this._service
      .Update({
        code: this.code.trim(),
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
