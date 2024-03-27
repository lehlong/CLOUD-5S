import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {AccountService} from 'src/app/services/AD/account.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {utils} from 'src/app/utils/utils';
import {ACCOUNT_RIGHTS} from 'src/app/utils/constant/index';
import {DropdownService} from 'src/app/services/Common/dropdown.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent {
  accountForm: FormGroup;
  submitted: boolean = false;
  filterGroup = new BaseFilter();
  ACCOUNT_RIGHTS = ACCOUNT_RIGHTS;

  listCompany: any = [];
  listPosition: any = [];
  listDepartment: any = [];
  listVehicle: any = [];

  constructor(
    private _as: AccountService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
  ) {
    this.accountForm = this._fb.group({
      userName: [null, [Validators.required, this.utils.trimSpace]],
      fullName: [null, [Validators.required, this.utils.trimSpace]],
      companyCode: [null, [Validators.required, this.utils.trimSpace]],
      address: [null],
      positionCode: null,
      departmentCode: null,
      email: [null, [Validators.email, this.utils.trimSpace]],
      phoneNumber: null,
      vehicleCode: [null],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.accountForm.controls;
  }

  loadInit() {
    this.getAllCompany();
    this.getAllPosition();
    this.getAllDepartment();
    this.getAllVehicle();
  }

  ngOnInit() {
    this.loadInit();
  }

  getAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompany = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getAllPosition() {
    this.dropdownService.GetAllPosition().subscribe(
      ({data}) => {
        this.listPosition = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getAllDepartment() {
    this.dropdownService.GetAllDepartment().subscribe(
      ({data}) => {
        this.listDepartment = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  resetAll() {
    this.accountForm?.get('userName')?.setValue(null);
    this.accountForm?.get('fullName')?.setValue(null);
    this.accountForm?.get('companyCode')?.setValue(null);
    this.accountForm?.get('positionCode')?.setValue(null);
    this.accountForm?.get('departmentCode')?.setValue(null);
    this.accountForm?.get('email')?.setValue(null);
    this.accountForm?.get('address')?.setValue(null);
    this.accountForm?.get('phoneNumber')?.setValue(null);
    this.accountForm?.get('vehicleCode')?.setValue(null);
    this.accountForm?.get('isActive')?.setValue(true);
  }

  close() {
    this.drawerService.close();
    this.resetAll();
  }

  onCreate() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this._as.Insert(this.accountForm.value).subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
        this.resetAll();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
