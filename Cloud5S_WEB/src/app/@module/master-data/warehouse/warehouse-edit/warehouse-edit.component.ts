import {Component} from '@angular/core';
import {WareHouseService} from 'src/app/services/MD/warehouse.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {WareHouseFilter} from 'src/app/@filter/MD/warehouse.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {STOCK_RIGHTS} from 'src/app/utils/constant/index';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouse-edit.component.html',
  styleUrls: ['./warehouse-edit.component.scss'],
})
export class WarehouseEditComponent {
  whForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  companyCode: string = '';
  isActive: boolean | null = null;
  companyCodes: any[] = [];
  filter = new WareHouseFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  STOCK_RIGHTS = STOCK_RIGHTS;

  constructor(
    private _service: WareHouseService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private _service1: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.whForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      companyCode: ['', [Validators.required, this.utils.trimSpace]],
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
    return this.whForm.controls;
  }

  ngOnInit() {
    this.whForm?.get('code')?.setValue(this.code);
    this.whForm?.get('name')?.setValue(this.name);
    this.whForm?.get('companyCode')?.setValue(this.companyCode);
    this.whForm?.get('isActive')?.setValue(this.isActive);
    this._service1.GetAllCompany().subscribe((result: any) => {
      this.companyCodes = result.data;
    });
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      companyCode: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.whForm?.get('code')?.setValue('');
    this.whForm?.get('name')?.setValue('');
    this.whForm?.get('companyCode')?.setValue('');
    this.whForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.whForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
        name: this.whForm.value.name.trim(),
        companyCode: this.whForm.value.companyCode.trim(),
        isActive: this.whForm.value.isActive,
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
