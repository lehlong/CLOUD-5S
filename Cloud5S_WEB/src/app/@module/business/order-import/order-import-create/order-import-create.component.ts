import {Component, HostListener} from '@angular/core';
import {OrderImportService} from 'src/app/services/Business/order-import-service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {utils} from 'src/app/utils/utils';
import {STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {OrderChooseItemComponent} from '../order-choose-item/order-choose-item.component';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';

import {item} from 'src/app/models/Business/stock.model';
@Component({
  selector: 'app-order-import-create',
  templateUrl: './order-import-create.component.html',
  styleUrls: ['./order-import-create.component.scss'],
})
export class OrderImportCreateComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  orderImpForm: FormGroup;
  submitted: boolean = false;
  listStock: any = [];
  stateDetail: string = '';
  STATE_STOCK = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  listItemDetails: item[] = [];
  filter = new StockImportFilter();
  widthDeault: string = '0px';
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;

  listPartnerAll: any = [];
  listStockAll: any = [];
  listVehicleAll: any = [];
  listContentPayAll: any = [];
  listBankAll: any = [];
  listPayMethodAll: any = [
    {name: 'Tiền mặt', code: 'TIEN_MAT'},
    {name: 'Chuyển khoản', code: 'CHUYEN_KHOAN'},
  ];

  moneyTotal: any[] = [];
  totalMoneyResult: number | string = '';
  payMethodCode: string = '';
  debtInsert: string | number = '';
  constructor(
    private _service: OrderImportService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.orderImpForm = this._fb.group({
      importDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
      note: '',
      importDetails: this._fb.array([]),
      driverName: [''],
      //
      disCount: '0',
      taxVAT: '10',
      payMoney: '0',
      totalMoney: [{value: '', disabled: true}],
      debt: [{value: '', disabled: true}],

      //
      address: '',
      phoneNumber: '',
      receiverName: [null, [Validators.required]],
      receiverPhoneNumber: null,
      receiverAddress: [null, [Validators.required]],
      payMethod: '',
      isPaymentNow: [false],
      // update-new
      partnerCode: ['', [Validators.required]],
      vehicleCode: ['', [Validators.required]],
      stockCode: ['', [Validators.required]],
      payMethodCode: [null, [Validators.required]],
      bankId: [null,[Validators.required]],
      contentPay: [null],
    });
    // validate
    this.orderImpForm.get('isPaymentNow')?.valueChanges.subscribe((x: any) => {
      if (x) {
        this.orderImpForm.controls['payMoney']?.setValidators([Validators.min(1), Validators.required]);
        this.orderImpForm.controls['payMethodCode']?.setValidators([Validators.required]);
        this.orderImpForm.controls['receiverName']?.setValidators([Validators.required]);
        // 
        if(this.orderImpForm.value.partnerCode){
          const partnerSelect = this.listPartnerAll.find((item: any) => item?.code == this.orderImpForm.value.partnerCode);
          this.orderImpForm.get('receiverName')?.setValue(partnerSelect?.name);
          this.orderImpForm.get('receiverPhoneNumber')?.setValue(this.orderImpForm.value.phoneNumber);
          this.orderImpForm.get('receiverAddress')?.setValue(this.orderImpForm.value.address);
        }else{
          this.orderImpForm.get('receiverName')?.setValue('');
          this.orderImpForm.get('receiverPhoneNumber')?.setValue('');
          this.orderImpForm.get('receiverAddress')?.setValue('');
        }
      } else {
        this.orderImpForm.get('payMoney')?.clearValidators();
        this.orderImpForm.get('payMoney')?.updateValueAndValidity();
        this.orderImpForm.get('payMethodCode')?.clearValidators();
        this.orderImpForm.get('payMethodCode')?.updateValueAndValidity();
        this.orderImpForm.get('receiverName')?.clearValidators();
        this.orderImpForm.get('receiverName')?.updateValueAndValidity();
      }
    });

    this.orderImpForm.get('payMethodCode')?.valueChanges.subscribe((x: any) => {
      if (x == 'CHUYEN_KHOAN') {
        this.orderImpForm.controls['bankId']?.setValidators([Validators.required]);
      } else {
        this.orderImpForm.get('bankId')?.clearValidators();
        this.orderImpForm.get('bankId')?.updateValueAndValidity();
      }
    });

    //end validate
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  selectPartner(value: string) {
    const partnerSelect = this.listPartnerAll.find((item: any) => item?.code == value);
    this.orderImpForm.get('address')?.setValue(partnerSelect?.address || '');
    this.orderImpForm.get('phoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
    // 
    if(this.orderImpForm.value.isPaymentNow){
      this.orderImpForm.get('receiverName')?.setValue(partnerSelect?.name);
      this.orderImpForm.get('receiverPhoneNumber')?.setValue(this.orderImpForm.value.phoneNumber);
      this.orderImpForm.get('receiverAddress')?.setValue(this.orderImpForm.value.address);
    }else{
      this.orderImpForm.get('receiverName')?.setValue('');
      this.orderImpForm.get('receiverPhoneNumber')?.setValue('');
      this.orderImpForm.get('receiverAddress')?.setValue('');
    }
  }
  selectPayMethod(value: string) {
    const payMethodSelect = this.listPayMethodAll.find((item: any) => item?.code == value);
    this.payMethodCode = payMethodSelect.code;
    // 
    if (value === 'TIEN_MAT') {
      this.orderImpForm.get('bankId')?.setValue(null);
      this.orderImpForm.controls['bankId'].disable();
      this.orderImpForm.controls['bankId'].clearValidators();
    } else {
      this.orderImpForm.controls['bankId'].enable();
      this.orderImpForm.controls['bankId'].setValidators([Validators.required]);
    }
    this.orderImpForm.controls['bankId'].updateValueAndValidity();
  }

  GetAllPartner() {
    this.dropdownService.GetAllProvider().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStockAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicleAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllContentPay() {
    this.dropdownService.GetAllPayType().subscribe(
      ({data}) => {
        this.listContentPayAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  // bank

  GetAllBank() {
    this.dropdownService.GetAllBank().subscribe(
      ({data}) => {
        this.listBankAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get importDetails(): FormArray {
    return this.orderImpForm.get('importDetails') as FormArray;
  }

  createImportDetails(params: any = null): FormGroup {
    return this._fb.group({
      itemCode: [params?.itemCode || '', Validators.required],
      amount: [params?.amount || '',[Validators.required, Validators.min(1)]],
      price: [params?.price || '', Validators.required],
      // note: params?.note || '',
      totalMoney: 0,
    });
  }

  addImportDetails(params: any = null) {
    this.importDetails.push(this.createImportDetails(params));
  }

  removeImportDetails(index: number) {
    this.importDetails.removeAt(index);
    this.listItemDetails.splice(index, 1);
  }

  openChooseItem() {
    const dialogRef = this.dialog.open(OrderChooseItemComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
    dialogRef.componentInstance.listSelect = this.listItemDetails;
    dialogRef.afterClosed().subscribe((result: item[]) => {
      if (result) {
        const importDetails = this._fb.array([]);
        this.orderImpForm.setControl('importDetails', importDetails);
        this.listItemDetails = result.map((itemA, index) => {
          const matchingItem: any = this.listItemDetails.find((itemB) => itemB.code === itemA.code);
          if (matchingItem) {
            this.addImportDetails({
              itemCode: matchingItem?.code || '',
              amount: matchingItem?.amount,
              // note: matchingItem?.note,
              price: matchingItem?.costPrice,
            });
            return matchingItem;
          }
          this.addImportDetails({
            itemCode: itemA?.code || '',
            amount: '',
            // note: '',
            price: '',
          });
          // return itemA;
          return {...itemA, costPrice: this.utils.formatNumber(itemA.costPrice)};
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllPartner();
    this.GetAllStock();
    this.GetAllVehicle();
    this.GetAllContentPay();
    this.GetAllBank();
  }

  get f() {
    return this.orderImpForm.controls;
  }
  calculateTotalMoneySum(arr: any) {
    let moneySum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].totalMoney !== undefined) {
        moneySum += arr[i].totalMoney;
      }
    }
    return moneySum;
  }

  textQuantity(e: any, i: number) {
    this.listItemDetails[i].amount = e?.target?.value;
    let tmpQuantity = e?.target?.value.replace(/,/g, '');
    let tmpCostPrice = String(this.listItemDetails[i].costPrice).replace(/,/g, '');
    const moneyTotal = tmpQuantity * Number(tmpCostPrice) || 0;
    const data = this.orderImpForm.value.importDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      } else {
        const number = Number(item.amount.replace(/,/g, ''));
        const price = Number(item.price.replace(/,/g, ''));
        return {...item, totalMoney: number * price};
      }
    });
    this.moneyTotal = updatedData;
    this.totalMoneyResult = this.calculateTotalMoneySum(updatedData);
    //
    const disCount = Number(this.orderImpForm.value.disCount.replace(/,/g, ''));
    const taxVat = Number(this.orderImpForm.value.taxVAT.replace(/,/g, ''));
    const payMoney = Number(String(this.orderImpForm.value.payMoney).replace(/,/g, ''));
    const totalMoney =
      this.totalMoneyResult - this.totalMoneyResult * (disCount / 100) + this.totalMoneyResult * (taxVat / 100);
    const debt = Number(totalMoney) - payMoney;
    this.debtInsert = debt;
    //
    this.orderImpForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
    this.orderImpForm.get('debt')?.setValue(this.utils.formatNumber(debt));
    this.orderImpForm.get('importDetails')?.setValue(updatedData);
  }

  textPrice(e: any, i: number) {
    let tmpPrice = e?.target?.value.replace(/,/g, '');
    let tmpQuantity = String(this.orderImpForm.value.importDetails[i].amount).replace(/,/g, '');
    const moneyTotal = tmpPrice * Number(tmpQuantity);
    const data = this.orderImpForm.value.importDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.totalMoneyResult = this.calculateTotalMoneySum(updatedData);
    //
    const disCount = Number(this.orderImpForm.value.disCount.replace(/,/g, ''));
    const taxVat = Number(this.orderImpForm.value.taxVAT.replace(/,/g, ''));
    const payMoney = Number(String(this.orderImpForm.value.payMoney).replace(/,/g, ''));
    const totalMoney =
      this.totalMoneyResult - this.totalMoneyResult * (disCount / 100) + this.totalMoneyResult * (taxVat / 100);
    const debt = Number(totalMoney) - payMoney;
    this.debtInsert = debt;
    //
    this.orderImpForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
    this.orderImpForm.get('debt')?.setValue(this.utils.formatNumber(debt));
    this.orderImpForm.get('importDetails')?.setValue(updatedData);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }
  //
  enterDisCount(e: any) {
    try {
      const disCount: number = e.target.value == '' ? 0 : parseFloat(e.target.value.replace(/,/g, ''));
      const taxVAT: number =
        this.orderImpForm.get('taxVAT')?.value == ''
          ? 0
          : parseFloat(this.orderImpForm.get('taxVAT')?.value.replace(/,/g, ''));
      const totalMoneyResult = this.totalMoneyResult == '' ? 0 : this.totalMoneyResult;
      const totalMoney: number =
        Number(totalMoneyResult) -
        Number(totalMoneyResult) * (disCount / 100) +
        Number(totalMoneyResult) * (taxVAT / 100);
      if (e.target.value == '' && this.orderImpForm.get('taxVAT')?.value == '' && this.totalMoneyResult == '') {
        this.orderImpForm.get('totalMoney')?.setValue('');
        this.orderImpForm.get('debt')?.setValue('');
      } else {
        const payMoney =
          this.orderImpForm.value?.payMoney == '' ? 0 : parseFloat(String(this.orderImpForm.value?.payMoney).replace(/,/g, ''));
        this.orderImpForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
        this.orderImpForm.get('debt')?.setValue(this.utils.formatNumber(totalMoney - payMoney));
        this.debtInsert = totalMoney - payMoney;
      }
    } catch (e) {
      console.log(e);
    }
  }
  enterTaxVAT(e: any) {
    try {
      const taxVAT: number = e.target.value == '' ? 0 : parseFloat(e.target.value.replace(/,/g, ''));
      const disCount: number =
        this.orderImpForm.get('disCount')?.value == ''
          ? 0
          : parseFloat(this.orderImpForm.get('disCount')?.value.replace(/,/g, ''));
      const totalMoneyResult = this.totalMoneyResult == '' ? 0 : this.totalMoneyResult;
      const totalMoney: number =
        Number(totalMoneyResult) -
        Number(totalMoneyResult) * (disCount / 100) +
        Number(totalMoneyResult) * (taxVAT / 100);
      if (e.target.value == '' && this.orderImpForm.get('disCount')?.value == '' && this.totalMoneyResult == '') {
        this.orderImpForm.get('totalMoney')?.setValue('');
      } else {
        const payMoney =
          this.orderImpForm.value?.payMoney == '' ? 0 : parseFloat(String(this.orderImpForm.value?.payMoney).replace(/,/g, ''));
        this.orderImpForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
        this.orderImpForm.get('debt')?.setValue(this.utils.formatNumber(totalMoney - payMoney));
        this.debtInsert = totalMoney - payMoney;
      }
    } catch (e) {
      console.log(e);
    }
  }
  enterPayMoney(e: any) {
    try {
      const payMoney: number = e?.target?.value == '' ? 0 : parseFloat(e?.target?.value.replace(/,/g, ''));
      const totalMoney: number =
        this.orderImpForm.get('totalMoney')?.value == ''
          ? 0
          : parseFloat(this.orderImpForm.get('totalMoney')?.value.replace(/,/g, ''));
      const debt: number = totalMoney - payMoney;
      if (e?.target?.value == '' && this.orderImpForm.get('totalMoney')?.value == '') {
        this.orderImpForm.get('debt')?.setValue('');
      } else {
        this.orderImpForm.get('debt')?.setValue(this.utils.formatNumber(debt));
        this.debtInsert = debt;
      }
    } catch (e) {
      console.log(e);
    }
  }

  //

  onCreate() {
    this.submitted = true;
    if(this.orderImpForm.value.isPaymentNow == false){
      this.orderImpForm?.controls['bankId']?.clearValidators();
      this.orderImpForm?.controls['bankId']?.updateValueAndValidity();
      this.orderImpForm?.controls['payMethodCode']?.clearValidators();
      this.orderImpForm?.controls['payMethodCode']?.updateValueAndValidity();
      this.orderImpForm?.controls['receiverName']?.clearValidators();
      this.orderImpForm?.controls['receiverName']?.updateValueAndValidity();
      this.orderImpForm?.controls['receiverAddress']?.clearValidators();
      this.orderImpForm?.controls['receiverAddress']?.updateValueAndValidity();
    }
    if (this.orderImpForm.invalid) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng nhập đủ thông tin còn trống',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    // const importDate = moment(this.orderImpForm.value?.importDate + 'T07:35:18.668Z').toISOString();
    let objectInsert = {
      importDate: this.orderImpForm.value?.importDate,
      partnerCode: this.orderImpForm.value.partnerCode,
      stockCode: this.orderImpForm.value.stockCode,
      vehicleCode: this.orderImpForm.value.vehicleCode,
      discount: Number(this.orderImpForm.value.disCount),
      taxVat: Number(this.orderImpForm.value.taxVAT),
      sumMoney: this.totalMoneyResult,
      payMoney: Number(String(this.orderImpForm.value.payMoney).replace(/,/g, '')),
      driverName: this.orderImpForm.value.driverName,
      partnerPhoneNumber: this.orderImpForm.value.phoneNumber,
      partnerAddress: this.orderImpForm.value.address,
      paymentType: this.orderImpForm.value.contentPay,
      paymentMethod: this.orderImpForm.value.payMethodCode,
      receiverName: this.orderImpForm.value.receiverName,
      receiverAddress: this.orderImpForm.value.receiverAddress,
      receiverPhoneNumber: this.orderImpForm.value.receiverPhoneNumber,
      debt: this.debtInsert,
      isPaymentNow: this.orderImpForm.value.isPaymentNow,
      bankAccountId: this.orderImpForm.value.bankId,
      importDetails: this.orderImpForm.value?.importDetails.map((item: any) => {
        const {totalMoney, ...rest} = item;
        const amount = rest.amount?.replace(/,/g, '');
        const price = rest.price?.replace(/,/g, '');
        const itemCode = rest.itemCode;
        return {
          itemCode,
          number: Number(amount),
          price: Number(price),
          sumMoney: this.totalMoneyResult,
        };
      }),
    };
    console.log('objectInsert', objectInsert);
    if (!objectInsert.importDetails.length) {
      Swal.fire({
        showCloseButton: true,
        title: 'Chưa thêm các sản phẩm nhập hàng',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    this._service.Insert(objectInsert).subscribe(
      (data) => {
        this.drawerService.returnData({
          ...data,
          create: true,
        });
        this.submitted = false;
        const importDetails = this._fb.array([]);
        this.orderImpForm.setControl('importDetails', importDetails);
        this.orderImpForm.get('note')?.setValue('');
        this.close();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
