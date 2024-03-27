import {Component} from '@angular/core';
import {PaymentVoucherService} from 'src/app/services/Business/payment-voucher.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PAYMENT_METHOD, PAYMENT_VOUCHER_RIGHTS} from 'src/app/utils/constant/index';
import {ChoosePartnerComponent} from '../choose-partner/choose-partner.component';
import {MatDialog} from '@angular/material/dialog';
import {ChooseReceiptComponent} from '../choose-receipt/choose-receipt.component';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-payment-voucher-edit',
  templateUrl: './payment-voucher-edit.component.html',
  styleUrls: ['./payment-voucher-edit.component.scss'],
})
export class PaymentVoucherEditComponent {
  displayedColumns: string[] = ['code', 'importDate', 'partner', 'debt'];
  PAYMENT_METHOD = PAYMENT_METHOD;
  PAYMENT_VOUCHER_RIGHTS = PAYMENT_VOUCHER_RIGHTS;

  paymentVoucherForm: FormGroup;
  submitted: boolean = false;

  listPartnerAll: any = [];
  listBankAll: any = [];
  listPayTypeAll: any = [];

  code: string = '';

  widthDeault: string = '0px';
  dataReceipt: any = [];

  constructor(
    private _service: PaymentVoucherService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    public dialog: MatDialog,
    public utils: utils,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.paymentVoucherForm = this._fb.group({
      paymentDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
      partnerCode: ['', [Validators.required]],
      receiverName: ['', [Validators.required]],
      receiverPhoneNumber: '',
      receiverAddress: '',
      paymentMethod: ['', [Validators.required]],
      bankAccountId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      reason: '',
      money: ['', [Validators.required]],
      note: '',
      orderImportCodes: [[]],
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  selectPaymentMethod(value: string) {
    if (value === 'TIEN_MAT') {
      this.paymentVoucherForm.get('bankAccountId')?.setValue('');
      this.paymentVoucherForm.controls['bankAccountId'].disable();
      this.paymentVoucherForm.controls['bankAccountId'].clearValidators();
    } else {
      this.paymentVoucherForm.controls['bankAccountId'].enable();
      this.paymentVoucherForm.controls['bankAccountId'].setValidators([Validators.required]);
    }
    this.paymentVoucherForm.controls['bankAccountId'].updateValueAndValidity();
  }

  getTotalReceipt() {
    return this.utils.formatNumber(
      this.dataReceipt.reduce((total: number, element: any) => {
        return total + element?.debt;
      }, 0),
    );
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
    this.GetAllPayType();
    this.GetDetail();
  }

  openChoosePartner() {
    const dialogRef = this.dialog.open(ChoosePartnerComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });

    dialogRef.afterClosed().subscribe((code: string) => {
      if (code) {
        this.paymentVoucherForm.get('partnerCode')?.setValue(code);
        const partnerSelect = this.listPartnerAll.find((element: any) => element?.code == code);
        this.paymentVoucherForm.get('receiverName')?.setValue(partnerSelect?.name || '');
        this.paymentVoucherForm.get('receiverAddress')?.setValue(partnerSelect?.address || '');
        this.paymentVoucherForm.get('receiverPhoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
      }
    });
  }

  openChooseReceipt() {
    const dialogRef = this.dialog.open(ChooseReceiptComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
    dialogRef.componentInstance.listSelect = this.dataReceipt;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const dataCode = result.map((element: any) => element.code);
        this.paymentVoucherForm.get('orderImportCodes')?.setValue(dataCode);
        this.dataReceipt = result;
      }
    });
  }

  selectPartner(value: string) {
    const partnerSelect = this.listPartnerAll.find((item: any) => item?.code == value);
    this.paymentVoucherForm.get('receiverName')?.setValue(partnerSelect?.name || '');
    this.paymentVoucherForm.get('receiverAddress')?.setValue(partnerSelect?.address || '');
    this.paymentVoucherForm.get('receiverPhoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          const payBillImports = data?.payBillImports.map((element: any) => element?.importCode);
          this.dataReceipt = data?.payBillImports.map((element: any) => {
            return {
              code: element?.importCode,
              importDate: element?.orderImport?.importDate,
              partner: element?.orderImport?.partner,
              debt: element?.orderImport?.debt,
            };
          });
          this.paymentVoucherForm.patchValue({
            paymentDate: data?.paymentDate ? moment(data.paymentDate).format('YYYY-MM-DD') : null,
            partnerCode: data?.partnerCode,
            receiverName: data?.receiverName,
            receiverPhoneNumber: data?.receiverPhoneNumber,
            receiverAddress: data?.receiverAddress,
            paymentMethod: data?.paymentMethod,
            bankAccountId: data?.bankAccountId,
            type: data?.type,
            reason: data?.reason,
            money: data?.money,
            note: data?.note,
            orderImportCodes: payBillImports,
          });
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  GetAllPartner() {
    this.dropdownService
      .GetAllPartner({
        IsProvider: true,
      })
      .subscribe(
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

  GetAllPayType() {
    this.dropdownService.GetAllPayType().subscribe(
      ({data}) => {
        this.listPayTypeAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get f() {
    return this.paymentVoucherForm.controls;
  }

  close() {
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.paymentVoucherForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code,
        ...this.paymentVoucherForm.value,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData({
            code: this.code,
            openDetail: true,
          });
          this.submitted = false;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
