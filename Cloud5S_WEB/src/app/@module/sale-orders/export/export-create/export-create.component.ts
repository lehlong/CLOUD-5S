import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from './../../../../services/Common/drawer.service';
import {Component, HostListener, OnInit} from '@angular/core';
import {ACTION_STOCK, STATE_STOCK} from 'src/app/utils/constant';
import {item} from 'src/app/models/Business/stock.model';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {StockImportService} from 'src/app/services/Business/stock-import.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {StockChooseItemComponent} from 'src/app/@module/business/stock-import/stock-choose-item/stock-choose-item.component';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {utils} from 'src/app/utils/utils';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import {OrderExportFilter} from 'src/app/@filter/SO/export.filter';
import {ItemSelect} from 'src/app/models/MD/item.model';
import {LIST_PAYMENT_METHOD} from 'src/app/utils/constant/order-export';

@Component({
  selector: 'app-export-create',
  templateUrl: './export-create.component.html',
  styleUrls: ['./export-create.component.scss'],
})
export class ExportCreateComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
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
  listBankAccount: any = [];
  listInComeType: any = [];
  bankSelected = null;
  inComeTypeSelected = null;

  partnerSelected = {
    code: '',
    name: '',
    phoneNumber: '',
    address: '',
  };
  stockSelected = {
    code: '',
    name: '',
  };
  vehicleSelected = {
    code: '',
    name: '',
  };

  moneyTotal: any[] = [];

  partnerCode: string = '';
  stockCode: string = '';
  radioValue = false;
  listPayMethod = LIST_PAYMENT_METHOD;

  constructor(
    private _service: OrderExportService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private partnerService: PartnerService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.exportForm = this._fb.group({
      type: ['TM', [Validators.required]],
      exportDate: [new Date(), [Validators.required]],
      partnerCode: ['', [Validators.required]],
      vehicleCode: ['', [Validators.required]],
      stockCode: ['', [Validators.required]],
      driverName: ['', [Validators.required]],
      partnerPhoneNumber: [''],
      partnerAddress: [''],
      orderCode: [null],
      discount: ['0'],
      taxVat: ['10'],
      sumMoney: [null],
      payMoney: [0],
      debt: [null],
      isPaymentNow: [false],
      paymentType: [null],
      senderAddress: [null],
      senderPhoneNumber: [null],
      bankAccountId: [null],
      paymentMethod: [null],
      senderName: [null],
      exportDetails: this._fb.array([]),
    });
    this.exportForm.get('isPaymentNow')?.valueChanges.subscribe((x: any) => {
      if (x) {
        this.exportForm.controls['payMoney']?.setValidators([Validators.min(1), Validators.required]);
        this.exportForm.controls['paymentMethod']?.setValidators([Validators.required]);
        this.exportForm.controls['senderName']?.setValidators([Validators.required]);
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
        this.exportForm.controls['bankAccountId']?.setValidators([Validators.required]);
      } else {
        this.exportForm.get('bankAccountId')?.clearValidators();
        this.exportForm.get('bankAccountId')?.updateValueAndValidity();
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
      totalMoney: [params?.sumMoney],
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
        this.listItemDetails = result.map((itemA: any, index) => {
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
          return {...itemA, costPrice: itemA.costPrice, sumMoney: ''};
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
    this.GetAllBankAccout();
    this.GetAllInComeType();
  }

  get f() {
    return this.exportForm.controls;
  }

  // formatNumber(number: number | string): string {
  //   return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }

  textQuantity(e: any, i: number) {
    this.listItemDetails[i].number = e?.target?.value;
    let tmpQuantity = e?.target?.value.replace(/,/g, '');
    let tmpCostPrice = String(this.listItemDetails[i].costPrice).replace(/,/g, '');
    const moneyTotal = Number(tmpQuantity) * Number(tmpCostPrice);
    this.listItemDetails[i].sumMoney = moneyTotal;
    const data = this.exportForm.value.exportDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal, number: this.utils.formatNumber(item.number)};
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
    this.listItemDetails[i].sumMoney = moneyTotal;
    const data = this.exportForm.value.exportDetails;
    let updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal, price: this.utils.formatNumber(item.price)};
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
    let discount = this.exportForm.value.discount || 0;
    let taxVat = this.exportForm.value.taxVat || 0;
    let totalMoneys = exportDetails.map((o: any) => o.totalMoney);
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
    let payMoney = this.exportForm.value?.payMoney || 0;
    this.exportForm.get('debt')?.setValue(this.getSummoney() - Number(payMoney));
    return this.getSummoney() - Number(payMoney);
  }

  onCreate() {
    this.submitted = true;
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
        const sumMoney = item.totalMoney;
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

    this._service.Insert(objectInsert).subscribe(
      (data) => {
        this.drawerService.returnData({
          ...data,
          create: true,
        });
        this.submitted = false;
        const exportDetails = this._fb.array([]);
        this.exportForm.setControl('exportDetails', exportDetails);
        this.filter = {
          ...this.filter,
          orderExport: data.data?.code,
        };
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
