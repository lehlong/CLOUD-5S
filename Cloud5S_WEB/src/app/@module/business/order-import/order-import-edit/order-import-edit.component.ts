import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {StockImportService} from 'src/app/services/Business/stock-import.service';
import {OrderImportService} from 'src/app/services/Business/order-import-service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {utils} from 'src/app/utils/utils';
import {item} from 'src/app/models/Business/stock.model';
import {STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {OrderChooseItemComponent} from '../order-choose-item/order-choose-item.component';
import {PrintService} from 'src/app/services/Common/print.service';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-import-edit',
  templateUrl: './order-import-edit.component.html',
  styleUrls: ['./order-import-edit.component.scss'],
})
export class OrderImportEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  stockForm: FormGroup;
  submitted: boolean = false;
  listStock: any = [];
  listPartner: any = [];
  listVehicle: any = [];
  STATE_STOCK = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  code: string = '';
  listItemDetails: any[] = [];
  filter = new StockImportFilter();
  detailData: any = {};
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;

  moneyTotal: any[] = [];
  totalMoneyTmp: string | number = '';
  tongTienHang: string | number = '';

  listContentPayAll: any = [];
  listBankAll: any = [];
  listPayMethodAll: any = [
    {name: 'Tiền mặt', code: 'TIEN_MAT'},
    {name: 'Chuyển khoản', code: 'CHUYEN_KHOAN'},
  ];
  payMethodCode: string = '';
  constructor(
    private viewContainerRef: ViewContainerRef,
    private printService: PrintService,
    private _service: StockImportService,
    private _orderImportService: OrderImportService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.stockForm = this._fb.group({
      importDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
      partnerCode: ['', [Validators.required]],
      stockCode: ['', [Validators.required]],
      vehicleCode: ['', [Validators.required]],

      address: '',
      phoneNumber: '',
      note: '',
      importDetails: this._fb.array([]),
      driverName: '',
      disCount: ['0'],
      taxVAT: ['10'],
      payMoney: [0],
      totalMoney: [null],
      debt: [null],
      // new
      isPaymentNow: [true],
      paymentType: [''],
      receiverAddress: [''],
      receiverPhoneNumber: [''],
      bankAccountId: [''],
      paymentMethod: [''],
      receiverName: [''],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  getTotalMoney(detailData: any) {
    const totalImportValue = detailData.reduce((accumulator: any, currentProduct: any) => {
      const amount = String(currentProduct?.number).replace(/,/g, '') || 0;
      const price = String(currentProduct?.price).replace(/,/g, '') || 0;
      const _price = String(currentProduct?.costPrice).replace(/,/g, '') || 0;
      return accumulator + Number(amount) * Number(price) || accumulator + Number(amount) * Number(_price);
    }, 0);

    return this.utils.formatNumber(totalImportValue);
  }

  get importDetails(): FormArray {
    return this.stockForm.get('importDetails') as FormArray;
  }

  createImportDetails(params: any = null): FormGroup {
    return this._fb.group({
      itemCode: [params?.itemCode || '', Validators.required],
      // stockCode: [params?.stockCode || '', Validators.required],
      number: [params?.number || '', Validators.required],
      price: [params?.price || '', Validators.required],
      note: params?.note || '',
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

  selectPartner(value: string) {
    const partnerSelect = this.listPartner.find((item: any) => item?.code == value);
    this.stockForm.get('address')?.setValue(partnerSelect?.address || '');
    this.stockForm.get('phoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
    // 
    if(this.stockForm.value.isPaymentNow){
      this.stockForm.get('receiverName')?.setValue(partnerSelect?.name);
      this.stockForm.get('receiverPhoneNumber')?.setValue(this.stockForm.value.phoneNumber);
      this.stockForm.get('receiverAddress')?.setValue(this.stockForm.value.address);
    }else{
      this.stockForm.get('receiverName')?.setValue('');
      this.stockForm.get('receiverPhoneNumber')?.setValue('');
      this.stockForm.get('receiverAddress')?.setValue('');
    }
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
        const pourDateTimeArray = this._fb.array([]);
        this.stockForm.setControl('importDetails', pourDateTimeArray);
        this.listItemDetails = result.map((itemA, index) => {
          const matchingItem: any = this.listItemDetails.find((itemB) => itemB.code === itemA.code);
          if (matchingItem) {
            this.addImportDetails({
              itemCode: matchingItem?.code || '',
              // stockCode: matchingItem?.stock?.code || '',
              number: matchingItem?.number || '',
              note: matchingItem?.note,
              price: this.utils.formatNumber(matchingItem?.costPrice) || '',
            });
            return matchingItem;
          }
          this.addImportDetails({
            itemCode: itemA?.code || '',
            // stockCode: '',
            number: '',
            note: '',
            price: this.utils.formatNumber(itemA.costPrice) || '',
          });
          return {...itemA , costPrice: this.utils.formatNumber(itemA.costPrice)};
        });
        console.log('this.listItemDetails',this.listItemDetails);
      }
    });
  }
  handleChangeTypePay() { 
    if (this.stockForm.value.isPaymentNow === false) {
      const totalMoney = this.stockForm.value.totalMoney;
      this.stockForm.get('debt')?.setValue(this.utils.formatNumber(totalMoney));
    }else{
       const tmpSum = Number(this.stockForm.value.totalMoney?.replace(/,/g, '')) || this.detailData.debt;
       const payMoney = Number(String(this.stockForm.value.payMoney)?.replace(/,/g, ''))
       const debt = tmpSum - payMoney ;
       this.stockForm.get('debt')?.setValue(this.utils.formatNumber(debt));
    }
  }
  showDetail() {
    this.drawerService.returnData({
      openDetail: true,
      code: this.code,
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllStock();
    this.GetAllPartner();
    this.GetAllVehicle();
    this.GetDetail();
    this.GetAllBank();
    this.GetAllContentPay();
  }

  GetDetail() {
    this._orderImportService
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          console.log('data', data);

          this.listItemDetails = data?.importDetails.map((element: any) => {
            this.addImportDetails({
              itemCode: element?.item?.code,
              // stockCode: data?.stock?.code,
              number: this.utils.formatNumber(element?.number),
              price: this.utils.formatNumber(element?.price),
              note: element?.note,
            });
            return {
              ...element?.item,
              stock: element?.stock,
              note: element?.note,
              number: this.utils.formatNumber(element?.number),
              price: this.utils.formatNumber(element?.price),
            };
          });
          this.moneyTotal = this.stockForm.value.importDetails.map((item: any) => {
            return {...item, totalMoney: Number(item.number.replace(/,/g, '')) * Number(item.price.replace(/,/g, ''))};
          });
          this.stockForm.get('importDetails')?.setValue(this.moneyTotal);
          const tongTienHang = Number(this.getTotalMoney(this.listItemDetails).replace(/,/g, ''));
          const initTotalMoney =
            tongTienHang - (tongTienHang * data.discount) / 100 + (tongTienHang * data.taxVat) / 100;

          this.stockForm.patchValue({
            importDate: data?.importDate ? moment(data.importDate).format('YYYY-MM-DD') : null,
            note: data?.importDetails?.note || '',

            partnerCode: data?.partner?.code || '',
            stockCode: data?.stock?.code || '',
            vehicleCode: data?.vehicle?.code || '',
            driverName: data?.driverName || '',
            address: data?.partner?.address || '',
            phoneNumber: data?.partner?.phoneNumber || '',
            disCount: data.discount,
            taxVAT: data.taxVat,
            payMoney: this.utils.formatNumber(data.payMoney),
            totalMoney: this.utils.formatNumber(initTotalMoney),
            // debt: this.utils.formatNumber(initTotalMoney - data.payMoney),
            debt: this.utils.formatNumber(data.debt),
            // newCode
            isPaymentNow: data.isPaymentNow,
            paymentMethod: data.paymentMethod,
            bankAccountId: data.bankAccountId,
            paymentType: data.paymentType,
            receiverName: data.receiverName,
            receiverPhoneNumber: data.receiverPhoneNumber,
            receiverAddress: data.receiverAddress,
          });
          this.totalMoneyTmp = data.sumMoney;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStock = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllPartner() {
    this.dropdownService.GetAllProvider().subscribe(
      ({data}) => {
        this.listPartner = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get f() {
    return this.stockForm.controls;
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
      const tongTienHang = Number(this.getTotalMoney(this.listItemDetails).replace(/,/g, ''));
      const disCount = e.target.value.replace(/,/g, '');
      const taxVal = this.stockForm.value.taxVAT;

      const totalReal = tongTienHang - (tongTienHang * Number(disCount)) / 100 + (tongTienHang * Number(taxVal)) / 100;
      this.stockForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalReal));
      const debt = totalReal - Number(String(this.stockForm.value.payMoney).replace(/,/g, ''));
      this.stockForm.get('debt')?.setValue(this.utils.formatNumber(debt));
    } catch (e) {
      console.log(e);
    }
  }
  enterTaxVAT(e: any) {
    try {
      const tongTienHang = Number(this.getTotalMoney(this.listItemDetails).replace(/,/g, ''));
      const tax = e.target.value.replace(/,/g, '');
      const disCount = this.stockForm.value.disCount;

      const totalReal = tongTienHang - (tongTienHang * Number(disCount)) / 100 + (tongTienHang * Number(tax)) / 100;
      this.stockForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalReal));
      const debt = totalReal - Number(String(this.stockForm.value.payMoney).replace(/,/g, ''));
      this.stockForm.get('debt')?.setValue(this.utils.formatNumber(debt));
    } catch (e) {
      console.log(e);
    }
  }
  enterPayMoney(e: any) {
    try {
      const pay = e?.target?.value.replace(/,/g, '');
      const tmp = this.stockForm.value.totalMoney.replace(/,/g, '');
      const debt = Number(tmp) - Number(pay);
      this.stockForm.get('debt')?.setValue(this.utils.formatNumber(debt));
    } catch (e) {
      console.log(e);
    }
  }
  //
  textQuantity(e: any, i: number) {
    let tmpQuantity = e?.target?.value.replace(/,/g, '');
    let tmpCostPrice = String(this.listItemDetails[i].price).replace(/,/g, '');
    let _tmpCostPrice = String(this.listItemDetails[i].costPrice).replace(/,/g, '');
    const moneyTotal = tmpQuantity * Number(tmpCostPrice) || tmpQuantity * Number(_tmpCostPrice);
    const data = this.stockForm.value.importDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      } else {
        const number = Number(String(item.number).replace(/,/g, ''));
        const price = Number(String(item.price).replace(/,/g, ''));
        return {...item, totalMoney: number*price};
      }
    });
    this.moneyTotal = updatedData;
    this.stockForm.get('importDetails')?.setValue(updatedData);
    //
    const newTotalAll = this.getTotalMoney(updatedData);
    this.totalMoneyTmp = newTotalAll;

    const tongTienHang = Number(newTotalAll.replace(/,/g, ''));
    const discount = this.stockForm.value.disCount;
    const tax = this.stockForm.value.taxVAT;
    const TotalMoney = tongTienHang - (tongTienHang * discount) / 100 + (tongTienHang * tax) / 100;
    this.stockForm.get('totalMoney')?.setValue(this.utils.formatNumber(TotalMoney));
    // 
      if(this.stockForm.value.isPaymentNow === false){
        const tmp = this.stockForm.value.totalMoney.replace(/,/g, '');
        this.stockForm.get('debt')?.setValue(this.utils.formatNumber(tmp));
      }else{
        const tmp = Number(this.stockForm.value.totalMoney.replace(/,/g, ''));
        const payMoney = Number(String(this.stockForm.value.payMoney).replace(/,/g, ''));
        this.stockForm.get('debt')?.setValue(this.utils.formatNumber(tmp-payMoney));
      }
  }

  textPrice(e: any, i: number) {
    let tmpPrice = e?.target?.value.replace(/,/g, '');
    let tmpQuantity = String(this.stockForm.value.importDetails[i].number).replace(/,/g, '');
    const moneyTotal = tmpPrice * Number(tmpQuantity);
    const data = this.stockForm.value.importDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      } else {
        const number = Number(String(item.number).replace(/,/g, ''));
        const price = Number(String(item.price).replace(/,/g, ''));
        return {...item, totalMoney: number*price};
      }
    });
    this.moneyTotal = updatedData;
    this.stockForm.get('importDetails')?.setValue(updatedData);
    //
    const newTotalAll = this.getTotalMoney(updatedData);
    this.totalMoneyTmp = newTotalAll;

    const tongTienHang = Number(newTotalAll.replace(/,/g, ''));
    const discount = this.stockForm.value.disCount;
    const tax = this.stockForm.value.taxVAT;

    const TotalMoney = tongTienHang - (tongTienHang * discount) / 100 + (tongTienHang * tax) / 100;
    this.stockForm.get('totalMoney')?.setValue(this.utils.formatNumber(TotalMoney));
     // 
     if(this.stockForm.value.isPaymentNow === false){
      const tmp = this.stockForm.value.totalMoney.replace(/,/g, '');
      this.stockForm.get('debt')?.setValue(this.utils.formatNumber(tmp));
    }else{
      const tmp = Number(this.stockForm.value.totalMoney.replace(/,/g, ''));
      const payMoney = Number(String(this.stockForm.value.payMoney).replace(/,/g, ''));
      this.stockForm.get('debt')?.setValue(this.utils.formatNumber(tmp-payMoney));
    }
  }
  //
  // code new
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
  selectPayMethod(value: string) {
    const payMethodSelect = this.listPayMethodAll.find((item: any) => item?.code == value);
    this.payMethodCode = payMethodSelect?.code;
     // 
     if (value === 'TIEN_MAT') {
      this.stockForm.get('bankAccountId')?.setValue(null);
      this.stockForm.controls['bankAccountId'].disable();
      this.stockForm.controls['bankAccountId'].clearValidators();
    } else {
      this.stockForm.controls['bankAccountId'].enable();
      this.stockForm.controls['bankAccountId'].setValidators([Validators.required]);
    }
    this.stockForm.controls['bankAccountId'].updateValueAndValidity();
  }
  // code new
  onEdit() {
    this.submitted = true;
    if(this.stockForm.value.isPaymentNow == false){
      this.stockForm?.controls['bankAccountId']?.clearValidators();
      this.stockForm?.controls['bankAccountId']?.updateValueAndValidity();
      this.stockForm?.controls['payMethodCode']?.clearValidators();
      this.stockForm?.controls['payMethodCode']?.updateValueAndValidity();
      this.stockForm?.controls['receiverName']?.clearValidators();
      this.stockForm?.controls['receiverName']?.updateValueAndValidity();
      this.stockForm?.controls['receiverAddress']?.clearValidators();
      this.stockForm?.controls['receiverAddress']?.updateValueAndValidity();
    }
    if (this.stockForm.invalid) {
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
    const cloneImportDetail = this.stockForm.value?.importDetails.map((item: any) => {
      const {itemCode, number, price, totalMoney, ...rest} = item;
      return {
        itemCode,
        number: Number(String(number).replace(/,/g, '')),
        price: Number(String(price).replace(/,/g, '')),
        sumMoney: totalMoney,
      };
    });
    let objUpdateModel: any = {
      code: this.code,
      partnerCode: this.stockForm.value.partnerCode,
      stockCode: this.stockForm.value.stockCode,
      vehicleCode: this.stockForm.value.vehicleCode,
      importDate: this.stockForm.value.importDate,
      driverName: this.stockForm.value.driverName,
      discount: Number(this.stockForm.value?.disCount),
      taxVat: Number(this.stockForm.value?.taxVAT),
      sumMoney: Number(this.stockForm.value?.totalMoney.replace(/,/g, '')),
      payMoney: Number(String(this.stockForm.value?.payMoney).replace(/,/g, '')),
      debt: Number(this.stockForm.value?.debt.replace(/,/g, '')),
      importDetails: cloneImportDetail,
      //
      isPaymentNow: this.stockForm.value?.isPaymentNow,
      paymentMethod: this.stockForm.value?.paymentMethod,
      bankAccountId: this.stockForm.value?.bankAccountId,
      paymentType: this.stockForm.value?.paymentType,
      receiverName: this.stockForm.value?.receiverName,
      receiverPhoneNumber: this.stockForm.value?.receiverPhoneNumber,
      receiverAddress: this.stockForm.value?.receiverAddress,
    };
    let objUpdate: any = {};

    if (!!this.stockForm.value?.isPaymentNow) {
      objUpdate = {...objUpdateModel};
    } else {
      objUpdate = {
        ...objUpdateModel,
        isPaymentNow: this.stockForm.value?.isPaymentNow,
        payMoney:0,
        paymentMethod: null,
        bankAccountId: null,
        paymentType: null,
        receiverName: null,
        receiverPhoneNumber: null,
        receiverAddress: null,
      };
    }
    
    this._orderImportService.Update(objUpdate).subscribe(
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
