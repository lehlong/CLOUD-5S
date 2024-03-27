import {Component} from '@angular/core';
import {BankAccountService} from 'src/app/services/MD/bank-account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BankAccountFilter} from 'src/app/@filter/MD/bank-account.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {BANKACCOUNT_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-bank-account-edit',
  templateUrl: './bank-account-edit.component.html',
  styleUrls: ['./bank-account-edit.component.scss'],
})
export class BankAccountEditComponent {
  bankaccountForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  bankAccount: string = '';
  ownerName: string = '';
  bankName: string = '';
  BANKACCOUNT_RIGHTS = BANKACCOUNT_RIGHTS;

  isActive: boolean | null = null;
  filter = new BankAccountFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: BankAccountService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.bankaccountForm = this._fb.group({
      id: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      bankAccount: ['', [Validators.required, this.utils.trimSpace]],
      ownerName: ['', [Validators.required, this.utils.trimSpace]],
      bankName: ['', [Validators.required, this.utils.trimSpace]],
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
    return this.bankaccountForm.controls;
  }

  ngOnInit() {
    this.bankaccountForm?.get('id')?.setValue(this.id);

    this.bankaccountForm?.get('name')?.setValue(this.name);
    this.bankaccountForm?.get('bankAccount')?.setValue(this.bankAccount);
    this.bankaccountForm?.get('ownerName')?.setValue(this.ownerName);
    this.bankaccountForm?.get('bankName')?.setValue(this.bankName);
    this.bankaccountForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      id: '',

      name: '',
      bankAccount: '',
      ownerName: '',
      bankName: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.bankaccountForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.bankaccountForm.value.id,
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
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
