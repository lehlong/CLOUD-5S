import {Component, HostListener} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ORDER_TYPE_ITEM, ORDER_RIGHTS, STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {STATE_ORDER} from 'src/app/utils/constant/index';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {utils} from 'src/app/utils/utils';
import {LIST_PAYMENT_METHOD} from 'src/app/utils/constant/order-export';
import {StockChooseItemComponent} from 'src/app/@module/business/stock-import/stock-choose-item/stock-choose-item.component';
import {item} from 'src/app/models/Business/stock.model';
import Swal from 'sweetalert2';
import {EPURCHASING_METHOD, PURCHASING_METHOD} from 'src/app/utils/constant/order';
@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  orderForm: FormGroup;
  submitted: boolean = false;
  stateDetail: string = '';
  listItemDetails: any[] = [];
  filter = new OrderFilter();
  widthDeault: string = '0px';

  listPartnerAll: any = [];
  listVehicleAll: any = [];
  listStationAll: any = [];
  listOrderBatchAll: any = [];
  moneyTotal: any[] = [];
  phoneNumber: string = '';
  address: string = '';
  PURCHASING_METHOD = PURCHASING_METHOD;
  EPURCHASING_METHOD = EPURCHASING_METHOD;

  constructor(
    private _service: OrderService,
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
    this.orderForm = this._fb.group({
      partnerCode: [null],
      orderDate: [new Date(), [Validators.required]],
      type: ['NHAP_HANG', [Validators.required]],
      vehicleCode: ['', [Validators.required]],
      driverName: ['', [Validators.required]],
      orderBatchCode: ['', [Validators.required]],
      stationCode: [null],
      purchasingMethod: [EPURCHASING_METHOD.INTERNAL, [Validators.required]],
      note: [''],
      orderDetails: this._fb.array([]),
    });

    this.orderForm.get('purchasingMethod')?.valueChanges.subscribe((x: any) => {
      if (x == EPURCHASING_METHOD.INTERNAL) {
        this.orderForm.controls['stationCode']?.setValidators([Validators.required]);
        this.orderForm.get('partnerCode')?.clearValidators();
        this.orderForm.get('partnerCode')?.updateValueAndValidity();
      }
      if (x == EPURCHASING_METHOD.EXTERNAL) {
        this.orderForm.controls['partnerCode']?.setValidators([Validators.required]);
        this.orderForm.get('stationCode')?.clearValidators();
        this.orderForm.get('stationCode')?.updateValueAndValidity();
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
    this.address = found.address;
    this.phoneNumber = found.phoneNumber;
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

  selectVehicle(event: any) {
    const found = this.listVehicleAll.find((v: any) => v.code == event);
    this.orderForm.get('driverName')?.setValue(found.defaultDriver?.fullName || '');
  }

  selectStation(event: any) {
    const found = this.listStationAll.find((v: any) => v.code == event);
    this.address = found.address;
    this.phoneNumber = found.phoneNumber;
  }

  selectOrderBatch(event: any) {}

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

  GetAllStation() {
    this.dropdownService.GetAllPurchasingStation().subscribe(
      ({data}) => {
        this.listStationAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllOrderBatch() {
    this.dropdownService.GetAllOrderBatch().subscribe(
      ({data}) => {
        this.listOrderBatchAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get orderDetails(): FormArray {
    return this.orderForm.get('orderDetails') as FormArray;
  }

  createOrderDetails(params: any = null): FormGroup {
    return this._fb.group({
      itemCode: [params?.itemCode || '', Validators.required],
      number: [this.utils.formatNumber(params?.number) || '', Validators.required],
      price: [this.utils.formatNumber(params?.price) || '', Validators.required],
      totalMoney: [params?.sumMoney],
    });
  }

  addOrderDetails(params: any = null) {
    this.orderDetails.push(this.createOrderDetails(params));
  }

  // addImportDetailsAt(index: number, params:any = null) {
  //   this.orderDetails.insert(index, this.createImportDetails(params));
  // }

  removeImportDetails(index: number) {
    this.orderDetails.removeAt(index);
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
        const orderDetails = this._fb.array([]);
        this.orderForm.setControl('orderDetails', orderDetails);
        this.listItemDetails = result.map((itemA: any, index) => {
          const matchingItem: any = this.listItemDetails.find((itemB) => itemB.code === itemA.code);
          if (matchingItem) {
            this.addOrderDetails({
              itemCode: matchingItem?.code || '',
              number: matchingItem?.number,
              price: matchingItem?.costPrice,
              sumMoney: matchingItem?.sumMoney,
            });
            return matchingItem;
          }
          this.addOrderDetails({
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
    this.GetAllVehicle();
    this.GetAllStation();
    this.GetAllOrderBatch();
  }

  get f() {
    return this.orderForm.controls;
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
    const data = this.orderForm.value.orderDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal, number: this.utils.formatNumber(item.number)};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.orderForm.get('orderDetails')?.setValue(updatedData);
  }

  textPrice(e: any, i: number) {
    let tmpPrice = e?.target?.value.replace(/,/g, '');
    let tmpQuantity = String(this.orderForm.value.orderDetails[i].number).replace(/,/g, '');
    const moneyTotal = Number(tmpPrice) * Number(tmpQuantity);
    this.listItemDetails[i].sumMoney = moneyTotal;
    const data = this.orderForm.value.orderDetails;
    let updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal, price: this.utils.formatNumber(item.price)};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.orderForm.get('orderDetails')?.setValue(updatedData);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  getSummoney() {
    let orderDetails = this.orderForm.value?.orderDetails;
    let discount = this.orderForm.value.discount || 0;
    let taxVat = this.orderForm.value.taxVat || 0;
    let totalMoneys = orderDetails.map((o: any) => o.totalMoney);
    if (totalMoneys.length > 0) {
      let sumMoney = totalMoneys.reduce((total: number, currentValue: any) => {
        if (!currentValue) {
          currentValue = 0;
        }
        return total + currentValue;
      });
      let finalSum =
        Number(sumMoney) - (Number(sumMoney) * Number(discount)) / 100 + (Number(sumMoney) * Number(taxVat)) / 100;
      this.orderForm.get('sumMoney')?.setValue(Math.ceil(finalSum));
      return Math.ceil(finalSum);
    }
    return 0;
  }

  getDebt() {
    let payMoney = this.orderForm.value?.payMoney || 0;
    this.orderForm.get('debt')?.setValue(this.getSummoney() - Number(payMoney));
    return this.getSummoney() - Number(payMoney);
  }

  onCreate() {
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    const orderDate = moment(this.orderForm.value?.orderDate).format('YYYY-MM-DDTHH:mm:ss');
    let objectInsert = {
      ...this.orderForm.value,
      orderDate: orderDate,
      orderDetails: this.orderForm.value?.orderDetails.map((item: any) => {
        const {totalMoney, number, ...rest} = item;
        const orderNumber = Number(item.number.replace(/,/g, ''));
        const price = Number(item.price.replace(/,/g, ''));
        return {
          ...rest,
          orderNumber,
          price,
          releaseNumber: null,
        };
      }),
    };

    if (!objectInsert.orderDetails.length) {
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
    console.log(objectInsert, 'objectInsert');
    this._service.Insert(objectInsert).subscribe(
      (data) => {
        this.drawerService.returnData({
          ...data,
          create: true,
        });
        this.submitted = false;
        const orderDetails = this._fb.array([]);
        this.orderForm.setControl('orderDetails', orderDetails);
        this.filter = {
          ...this.filter,
          code: data.data?.code,
        };
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
