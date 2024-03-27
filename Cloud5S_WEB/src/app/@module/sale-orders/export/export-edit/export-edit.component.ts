import {Component, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderExportFilter} from 'src/app/@filter/SO/export.filter';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import {ACTION_STOCK, STATE_STOCK} from 'src/app/utils/constant';
import {ExportDetailComponent} from '../export-detail/export-detail.component';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {item} from 'src/app/models/Business/stock.model';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {MatDialog} from '@angular/material/dialog';
import {StockChooseItemComponent} from 'src/app/@module/business/stock-import/stock-choose-item/stock-choose-item.component';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {utils} from 'src/app/utils/utils';
import {ItemSelect} from 'src/app/models/MD/item.model';
import {LIST_PAYMENT_METHOD, ORDER_EXPORT_TYPE} from 'src/app/utils/constant/order-export';
@Component({
  selector: 'app-export-edit',
  templateUrl: './export-edit.component.html',
  styleUrls: ['./export-edit.component.scss'],
})
export class ExportEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  itemDetail: any;
  exportForm: FormGroup;
  submitted: boolean = false;
  listStock: any = [];
  stateDetail: string = '';
  STATE_STOCK = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  listItemDetails: any[] = [];
  filter = new OrderExportFilter();
  widthDeault: string = '0px';
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;

  listPartnerAll: any = [];
  listStockAll: any = [];
  listVehicleAll: any = [];

  moneyTotal: any[] = [];

  partnerCode: string = '';
  stockCode: string = '';
  listBankAccount: any = [];
  listInComeType: any = [];
  bankSelected = null;
  inComeTypeSelected = null;
  listPayMethod = LIST_PAYMENT_METHOD;
  ORDER_EXPORT_TYPE = ORDER_EXPORT_TYPE;

  constructor(
    private _service: OrderExportService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.exportForm = this._fb.group({
      code: [''],
      type: ['', [Validators.required]],
      exportDate: [new Date(), [Validators.required]],
      partnerCode: ['', [Validators.required]],
      vehicleCode: [''],
      stockCode: [''],
      driverName: [''],
      partnerPhoneNumber: [''],
      partnerAddress: [''],
      orderCode: [null],
      discount: ['0'],
      taxVat: ['10'],
      sumMoney: [null],
      payMoney: [0],
      debt: [null],
      isPaymentNow: [false],
      paymentType: [''],
      senderAddress: [''],
      senderPhoneNumber: [''],
      bankAccountId: [''],
      paymentMethod: [''],
      senderName: [''],
      exportDetails: this._fb.array([]),
    });
    this.exportForm.get('isPaymentNow')?.valueChanges.subscribe((x: any) => {
      if (x) {
        this.exportForm.get('payMoney')?.setValidators([Validators.min(1), Validators.required]);
        this.exportForm.get('paymentMethod')?.setValidators([Validators.required]);
        this.exportForm.get('senderName')?.setValidators([Validators.required]);
      } else {
        this.exportForm.get('payMoney')?.clearValidators();
        this.exportForm.get('payMoney')?.updateValueAndValidity();
        this.exportForm.get('paymentMethod')?.clearValidators();
        this.exportForm.get('paymentMethod')?.updateValueAndValidity();
        this.exportForm.get('senderName')?.clearValidators();
        this.exportForm.get('senderName')?.updateValueAndValidity();
      }
    });
    this.exportForm.get('paymentMethod')?.valueChanges.subscribe((x: any) => {
      if (x == 'CK') {
        this.exportForm.get('bankAccountId')?.setValidators([Validators.required]);
      } else {
        this.exportForm.get('bankAccountId')?.clearValidators();
        this.exportForm.get('bankAccountId')?.updateValueAndValidity();
      }
    });

    this.exportForm.get('type')?.valueChanges.subscribe((x: any) => {
      if (x == 'TM') {
        this.exportForm.get('vehicleCode')?.setValidators([Validators.required]);
        this.exportForm.get('stockCode')?.setValidators([Validators.required]);
      } else {
        this.exportForm.get('vehicleCode')?.clearValidators();
        this.exportForm.get('vehicleCode')?.updateValueAndValidity();
        this.exportForm.get('stockCode')?.clearValidators();
        this.exportForm.get('stockCode')?.updateValueAndValidity();
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  selectPartner(event: any) {
    const found = this.listPartnerAll.find((p: any) => p.code == event);
    this.exportForm.get('partnerAddress')?.setValue(found.address);
    this.exportForm.get('partnerPhoneNumber')?.setValue(found.phoneNumber);
    this.exportForm.get('senderName')?.setValue(found.name);
    this.exportForm.get('senderAddress')?.setValue(found.address);
    this.exportForm.get('senderPhoneNumber')?.setValue(found.phoneNumber);
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner({IsCustomer: true}).subscribe(
      ({data}) => {
        this.listPartnerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  selectStock(event: any) {}

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStock = data;
        this.listStockAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  selectVehicle(event: any) {
    const found = this.listVehicleAll.find((v: any) => v.code == event);
    this.exportForm.get('driverName')?.setValue(found.defaultDriver?.fullName || '');
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

  GetAllBankAccout() {
    this.dropdownService.GetAllBankAccount().subscribe(
      ({data}) => {
        this.listBankAccount = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllInComeType() {
    this.dropdownService.GetAllIncomeType().subscribe(
      ({data}) => {
        this.listInComeType = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get exportDetails(): FormArray {
    return this.exportForm.get('exportDetails') as FormArray;
  }

  createExportDetails(params: any = null): FormGroup {
    return this._fb.group({
      itemCode: [params?.itemCode || '', Validators.required],
      isMainItem: true,
      orderNumber: 0,
      number: [this.utils.formatNumber(params?.number) || '', Validators.required],
      price: [this.utils.formatNumber(params?.price) || '', Validators.required],
      sumMoney: [params?.sumMoney],
    });
  }

  addExportDetails(params: any = null) {
    this.exportDetails.push(this.createExportDetails(params));
  }

  // addImportDetailsAt(index: number, params:any = null) {
  //   this.exportDetails.insert(index, this.createImportDetails(params));
  // }

  removeImportDetails(index: number) {
    this.exportDetails.removeAt(index);
    this.listItemDetails.splice(index, 1);
  }

  openChooseItem() {
    const dialogRef = this.dialog.open(StockChooseItemComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
    dialogRef.componentInstance.listSelect = this.listItemDetails;
    dialogRef.afterClosed().subscribe((result: item[]) => {
      if (result) {
        const exportDetails = this._fb.array([]);
        this.exportForm.setControl('exportDetails', exportDetails);
        this.listItemDetails = result.map((itemA, index) => {
          const matchingItem: any = this.listItemDetails.find((itemB) => itemB.code === itemA.code);
          if (matchingItem) {
            this.addExportDetails({
              itemCode: matchingItem?.code || '',
              number: matchingItem?.number,
              price: matchingItem?.costPrice,
              sumMoney: matchingItem?.sumMoney,
            });
            return matchingItem;
          }
          this.addExportDetails({
            itemCode: itemA?.code || '',
            number: '',
            price: itemA.costPrice,
            sumMoney: '',
          });
          // return itemA;
          return {...itemA, costPrice: itemA.costPrice};
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit();
    this.getDetail();
  }

  getDetail() {
    this.exportForm?.get('code')?.setValue(this.itemDetail.code);
    this.exportForm?.get('type')?.setValue(this.itemDetail.type);
    this.exportForm?.get('exportDate')?.setValue(this.itemDetail.exportDate);
    this.exportForm.get('partnerCode')?.setValue(this.itemDetail.partnerCode);
    this.exportForm.get('vehicleCode')?.setValue(this.itemDetail.vehicleCode);
    this.exportForm.get('stockCode')?.setValue(this.itemDetail.stockCode);
    this.exportForm.get('driverName')?.setValue(this.itemDetail.driverName);
    this.exportForm
      .get('partnerPhoneNumber')
      ?.setValue(
        this.itemDetail.partnerPhoneNumber ? this.itemDetail.partnerPhoneNumber : this.itemDetail.partner?.phoneNumber,
      );
    this.exportForm
      .get('partnerAddress')
      ?.setValue(this.itemDetail.partnerAddress ? this.itemDetail.partnerAddress : this.itemDetail.partner?.address);
    this.exportForm.get('orderCode')?.setValue(this.itemDetail.orderCode);
    this.exportForm.get('discount')?.setValue(this.itemDetail.discount);
    this.exportForm.get('taxVat')?.setValue(this.itemDetail.taxVat);
    this.exportForm.get('sumMoney')?.setValue(this.itemDetail.sumMoney);
    this.exportForm.get('payMoney')?.setValue(this.itemDetail.payMoney);
    this.exportForm.get('debt')?.setValue(this.itemDetail.debt);
    this.exportForm.get('isPaymentNow')?.setValue(this.itemDetail.isPaymentNow);
    this.exportForm.get('paymentType')?.setValue(this.itemDetail.paymentType);
    this.exportForm.get('paymentMethod')?.setValue(this.itemDetail.paymentMethod);
    this.exportForm
      .get('senderName')
      ?.setValue(this.itemDetail.senderName ? this.itemDetail.senderName : this.itemDetail.partner?.name);
    this.exportForm
      .get('senderAddress')
      ?.setValue(this.itemDetail.senderAddress ? this.itemDetail.senderAddress : this.itemDetail.partner?.address);
    this.exportForm
      .get('senderPhoneNumber')
      ?.setValue(
        this.itemDetail.senderPhoneNumber ? this.itemDetail.senderPhoneNumber : this.itemDetail.partner?.phoneNumber,
      );
    this.exportForm.get('bankAccountId')?.setValue(this.itemDetail.bankAccountId);
    const exportDetails = this._fb.array([]);
    this.exportForm.setControl('exportDetails', exportDetails);
    this.listItemDetails = this.itemDetail.exportDetails.map((element: any) => {
      this.addExportDetails({
        itemCode: element?.itemCode || '',
        isMainItem: true,
        number: element?.number,
        price: element?.price,
        sumMoney: element?.sumMoney,
      });
      return {
        ...element?.item,
        number: element?.number,
        costPrice: element?.price,
        sumMoney: element?.sumMoney,
      };
    });
  }

  loadInit() {
    this.GetAllPartner();
    this.GetAllStock();
    this.GetAllVehicle();
    this.GetAllBankAccout();
    this.GetAllInComeType();
  }

  get f() {
    return this.exportForm.controls;
  }

  textQuantity(e: any, i: number) {
    this.listItemDetails[i].number = e?.target?.value;
    let tmpQuantity = e?.target?.value.replace(/,/g, '');
    let tmpCostPrice = String(this.listItemDetails[i].costPrice).replace(/,/g, '');
    const moneyTotal = tmpQuantity * Number(tmpCostPrice) || 0;
    const data = this.exportForm.value.exportDetails;
    this.listItemDetails[i].sumMoney = moneyTotal;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, sumMoney: moneyTotal, number: this.utils.formatNumber(item.number)};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.exportForm.get('exportDetails')?.setValue(updatedData);
  }

  textPrice(e: any, i: number) {
    let tmpPrice = e?.target?.value.replace(/,/g, '');
    let tmpQuantity = String(this.exportForm.value.exportDetails[i].number).replace(/,/g, '');
    const moneyTotal = Number(tmpPrice) * Number(tmpQuantity);
    const data = this.exportForm.value.exportDetails;
    this.listItemDetails[i].sumMoney = moneyTotal;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, sumMoney: moneyTotal, price: this.utils.formatNumber(item.price)};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.exportForm.get('exportDetails')?.setValue(updatedData);
  }

  close() {
    this.filter = {
      ...this.filter,
      orderExport: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  getSummoney() {
    let exportDetails = this.exportForm.value?.exportDetails;
    let discount = Number(this.exportForm.value.discount);
    let taxVat = Number(this.exportForm.value.taxVat);
    let totalMoneys = exportDetails.map((o: any) => Number(o?.sumMoney));
    if (totalMoneys.length > 0) {
      let sumMoney = totalMoneys.reduce((total: number, currentValue: any) => {
        if (!currentValue) {
          currentValue = 0;
        }
        return total + currentValue;
      });
      let finalSum =
        Number(sumMoney) - (Number(sumMoney) * Number(discount)) / 100 + (Number(sumMoney) * Number(taxVat)) / 100;
      this.exportForm.get('sumMoney')?.setValue(Math.ceil(finalSum));
      return Math.ceil(finalSum);
    }
    return 0;
  }

  getDebt() {
    let payMoney = this.exportForm.value?.payMoney;
    this.exportForm.get('debt')?.setValue(this.getSummoney() - Number(payMoney));
    return this.getSummoney() - Number(payMoney);
  }

  onCreate() {
    this.submitted = true;
    const invalid = [];
    const controls = this.exportForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log(name, 'name');
      }
    }
    if (this.exportForm.invalid) {
      return;
    }
    const exportDate = moment(this.exportForm.value?.exportDate).format('YYYY-MM-DDTHH:mm:ss');
    let objectInsert = {
      ...this.exportForm.value,
      discount: Number(this.exportForm.value.discount),
      taxVat: Number(this.exportForm.value.taxVat),
      payMoney: Number(this.exportForm.value.payMoney),
      exportDate: exportDate,
      exportDetails: this.exportForm.value?.exportDetails.map((item: any) => {
        const {totalMoney, ...rest} = item;
        const number = Number(rest.number.replace(/,/g, ''));
        const price = Number(rest.price.replace(/,/g, ''));
        const sumMoney = Number(item.sumMoney);
        return {
          ...rest,
          sumMoney,
          number,
          price,
        };
      }),
    };
    if (!objectInsert.exportDetails.length) {
      Swal.fire({
        showCloseButton: true,
        title: 'Chưa thêm các sản phẩm xuất hàng',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    this._service.Update(objectInsert).subscribe(
      (data) => {
        this.drawerService.returnData({code: this.itemDetail.code, openDetail: true});
        this.submitted = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onBack() {
    this.drawerService.open(ExportDetailComponent, {code: this.itemDetail.code});
  }
}
