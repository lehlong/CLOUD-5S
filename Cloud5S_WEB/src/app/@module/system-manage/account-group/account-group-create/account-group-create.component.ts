import {Component} from '@angular/core';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ACCOUNTGROUP_RIGHTS} from 'src/app/utils/constant/index';
import {RoleCodes} from 'src/app/utils/constant/role';
@Component({
  selector: 'app-account-group-create',
  templateUrl: './account-group-create.component.html',
  styleUrls: ['./account-group-create.component.scss'],
})
export class AccountGroupCreateComponent {
  accountGroupForm: FormGroup;
  submitted: boolean = false;
  ACCOUNTGROUP_RIGHTS = ACCOUNTGROUP_RIGHTS;
  optionsRoleCode = RoleCodes;

  constructor(
    private _service: AccountGroupService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.accountGroupForm = this._fb.group({
      name: [null, [Validators.required, this.utils.trimSpace]],
      notes: null,
      isActive: true,
      roleCode: null,
    });
  }

  get f() {
    return this.accountGroupForm.controls;
  }

  close() {
    this.drawerService.close();
    this.accountGroupForm?.get('name')?.setValue(null);
    this.accountGroupForm?.get('notes')?.setValue(null);
    this.accountGroupForm?.get('isActive')?.setValue(true);
    this.accountGroupForm?.get('roleCode')?.setValue(null);
  }

  onCreate() {
    this.submitted = true;
    if (this.accountGroupForm.invalid) {
      return;
    }
    this._service
      .Insert({
        name: this.accountGroupForm.value.name?.trim(),
        notes: this.accountGroupForm.value.notes?.trim(),
        isActive: this.accountGroupForm.value.isActive,
        roleCode: this.accountGroupForm.value.roleCode,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          this.accountGroupForm?.get('name')?.setValue(null);
          this.accountGroupForm?.get('notes')?.setValue(null);
          this.accountGroupForm?.get('isActive')?.setValue(true);
          this.accountGroupForm?.get('roleCode')?.setValue(null);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
