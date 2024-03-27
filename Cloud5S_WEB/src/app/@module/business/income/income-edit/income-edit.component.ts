import {Component} from '@angular/core';
import {IncomeService} from 'src/app/services/Business/income.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PAYMENT_INCOME_RIGHTS} from 'src/app/utils/constant/index';
import {PAYMENT_METHOD} from 'src/app/utils/constant/payment-method';
import {MatDialog} from '@angular/material/dialog';
import {ChooseExportIncomeComponent} from '../choose-export/choose-export.component';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.scss'],
})
export class IncomeEditComponent {
  displayedColumns: string[] = ['code', 'exportDate', 'partner', 'debt'];
  PAYMENT_METHOD = PAYMENT_METHOD;
  PAYMENT_INCOME_RIGHTS = PAYMENT_INCOME_RIGHTS;

  incomeForm: FormGroup;
  submitted: boolean = false;

  listPartnerAll: any = [];
  listBankAll: any = [];
  listIncomeTypeAll: any = [];

  code: string = '';
  detailData: any = {};
  dataExport: any = [];
  widthDeault: string = '0px';

  constructor(
    private _service: IncomeService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    public utils: utils,
    public dialog: MatDialog,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.incomeForm = this._fb.group({
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

  ngOnInit(): void {
    this.loadInit();
  }

  selectPartner(value: string) {
    const partnerSelect = this.listPartnerAll.find((item: any) => item?.code == value);
    this.incomeForm.get('senderName')?.setValue(partnerSelect?.name || '');
    this.incomeForm.get('senderAddress')?.setValue(partnerSelect?.address || '');
    this.incomeForm.get('senderPhoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
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

  showDetail() {
    this.drawerService.returnData({
      openDetail: true,
      code: this.code,
    });
  }

  loadInit() {
    this.GetAllPartner();
    this.GetAllBankAccount();
    this.GetAllIncomeType();
    this.GetDetail();
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          const payBillExport = data?.incomeBillExports.map((element: any) => element?.exportCode);
          this.dataExport = data?.incomeBillExports.map((element: any) => {
            return {
              code: element?.exportCode,
              exportDate: element?.orderExport?.exportDate,
              partner: element?.orderExport?.partner,
              debt: element?.orderExport?.debt,
            };
          });

          this.incomeForm.patchValue({
            paymentDate: data?.paymentDate ? moment(data.paymentDate).format('YYYY-MM-DD') : null,
            partnerCode: data?.partnerCode,
            senderName: data?.senderName,
            senderPhoneNumber: data?.senderPhoneNumber,
            senderAddress: data?.senderAddress,
            paymentMethod: data?.paymentMethod,
            bankAccountId: data?.bankAccountId,
            type: data?.type,
            reason: data?.reason,
            money: data?.money,
            note: data?.note,
            orderExportCodes: payBillExport,
          });
        },
        (error) => {
          console.log('error: ', error);
        },
      );
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

  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
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
        this.listBankAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllIncomeType() {
    this.dropdownService.GetAllIncomeType().subscribe(
      ({data}) => {
        this.listIncomeTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get f() {
    return this.incomeForm.controls;
  }

  close() {
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.incomeForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code,
        ...this.incomeForm.value,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData({
            code: this.code,
            openDetail: true,
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
          });
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
