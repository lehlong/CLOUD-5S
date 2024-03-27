import {Component} from '@angular/core';
import {BankAccountService} from 'src/app/services/MD/bank-account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {BANKACCOUNT_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-bank-account-create',
  templateUrl: './bank-account-create.component.html',
  styleUrls: ['./bank-account-create.component.scss'],
})
export class BankAccountCreateComponent {
  bankaccountForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  BANKACCOUNT_RIGHTS = BANKACCOUNT_RIGHTS;

  constructor(
    private _service: BankAccountService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.bankaccountForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      bankAccount: ['', [Validators.required, this.utils.trimSpace]],
      ownerName: ['', [Validators.required, this.utils.trimSpace]],
      bankName: ['', [Validators.required, this.utils.trimSpace]],

      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.bankaccountForm.controls;
  }

  close() {
    this.drawerService.close();
    this.bankaccountForm?.get('name')?.setValue('');
    this.bankaccountForm?.get('bankAccount')?.setValue('');
    this.bankaccountForm?.get('ownerName')?.setValue('');
    this.bankaccountForm?.get('bankName')?.setValue('');
    this.bankaccountForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.bankaccountForm.invalid) {
      return;
    }
    this._service
      .Insert(
        {
          name: this.bankaccountForm.value.name.trim(),
          bankAccount: this.bankaccountForm.value.bankAccount.trim(),
          ownerName: this.bankaccountForm.value.ownerName.trim(),
          bankName: this.bankaccountForm.value.bankName.trim(),
          isActive: this.bankaccountForm.value.isActive,
        },
        false,
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.unitForm?.get('code')?.setValue('');
          // this.unitForm?.get('name')?.setValue('');
          // this.unitForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
