import {Component} from '@angular/core';
import {PAYMENT_INCOME_RIGHTS} from 'src/app/utils/constant/index';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PAYMENT_METHOD} from 'src/app/utils/constant/payment-method';
import {IncomeFilter} from 'src/app/@filter/Business/income.filter';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {IncomeService} from 'src/app/services/Business/income.service';
import {MatDialog} from '@angular/material/dialog';
import {ChoosePartnerIncomeComponent} from '../choose-partner/choose-partner.component';
import {ChooseExportIncomeComponent} from '../choose-export/choose-export.component';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.component.html',
  styleUrls: ['./income-create.component.scss'],
})
export class IncomeCreateComponent {
  displayedColumns: string[] = ['code', 'exportDate', 'partner', 'debt'];
  incomeForm: FormGroup;
  PAYMENT_INCOME_RIGHTS = PAYMENT_INCOME_RIGHTS;
  PAYMENT_METHOD = PAYMENT_METHOD;
  submitted: boolean = false;
  listPartnerAll: any = [];
  listBankAccount: any = [];
  listContentAll: any = [];
  listContentFilter: any = [];
  widthDeault: string = '0px';
  dataExport: any = [];

  constructor(
    private _service: IncomeService,
    private _fb: FormBuilder,
    private dropdownService: DropdownService,
    private drawerService: DrawerService,
    public dialog: MatDialog,
    public utils: utils,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.incomeForm = this._fb.group({
      partnerName: [{value: '', disabled: true}],
      partnerCode: '',
      senderName: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      money: ['', [Validators.required]],
      bankAccountId: '',
      senderAddress: '',
      senderPhoneNumber: [{value: ''}],
      reason: '',
      note: '',
      originalDoc: '',
      paymentDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
      type: ['', [Validators.required]],
      orderExportCodes: [[]],
    });
  }

  selectPartner(value: string) {
    const partnerSelect = this.listPartnerAll.find((item: any) => item?.code == value);
    this.incomeForm.get('senderName')?.setValue(partnerSelect?.name || '');
    this.incomeForm.get('senderAddress')?.setValue(partnerSelect?.address || '');
    this.incomeForm.get('senderPhoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner({IsCustomer: true, IsActive: true}).subscribe(
      ({data}) => {
        this.listPartnerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllBankAccount() {
    this.dropdownService.GetAllBankAccount().subscribe(
      ({data}) => {
        this.listBankAccount = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get f() {
    return this.incomeForm.controls;
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllPartner();
    this.GetAllBankAccount();
    this.GetAllContent();
  }

  GetAllContent() {
    this.dropdownService.GetAllIncomeType().subscribe(
      ({data}) => {
        this.listContentAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onChangeContent(event: any) {
    this.listContentFilter = this.listContentAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  selectPaymentMethod(value: string) {
    if (value === 'TIEN_MAT') {
      this.incomeForm.get('bankAccountId')?.setValue('');
      this.incomeForm.controls['bankAccountId'].disable();
    } else {
      this.incomeForm.controls['bankAccountId'].enable();
    }
    this.incomeForm.controls['bankAccountId'].updateValueAndValidity();
  }

  openChoosePartner() {
    const dialogRef = this.dialog.open(ChoosePartnerIncomeComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });

    dialogRef.afterClosed().subscribe((item: any) => {
      if (item) {
        this.incomeForm.get('partnerCode')?.setValue(item?.code);
        this.incomeForm.get('partnerName')?.setValue(item?.name);
        const partnerSelect = this.listPartnerAll.find((element: any) => element?.code == item.code);
        this.incomeForm.get('senderName')?.setValue(partnerSelect?.name || '');
        this.incomeForm.get('senderAddress')?.setValue(partnerSelect?.address || '');
        this.incomeForm.get('senderPhoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
      }
    });
  }

  openChooseExport() {
    const dialogRef = this.dialog.open(ChooseExportIncomeComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
    dialogRef.componentInstance.listSelect = this.dataExport;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const dataCode = result.map((element: any) => element.code);
        this.incomeForm.get('orderExportCodes')?.setValue(dataCode);
        this.dataExport = result;
      }
    });
  }

  getTotalExport() {
    return this.utils.formatNumber(
      this.dataExport.reduce((total: number, element: any) => {
        return total + element?.debt;
      }, 0),
    );
  }

  onCreate() {
    this.submitted = true;
    if (this.incomeForm.invalid) {
      return;
    }

    this._service.Insert(this.incomeForm.value, false).subscribe(
      (data) => {
        this.drawerService.returnData({
          ...data,
          create: true,
        });
        this.submitted = false;
        this.incomeForm.patchValue({
          paymentDate: '',
          partnerCode: '',
          senderName: '',
          senderPhoneNumber: '',
          senderAddress: '',
          paymentMethod: '',
          bankAccountId: '',
          type: '',
          reason: '',
          money: '',
          note: '',
          orderExportCodes: [],
        });
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  close() {
    this.drawerService.close();
  }
  openChooseItem() {}
}
