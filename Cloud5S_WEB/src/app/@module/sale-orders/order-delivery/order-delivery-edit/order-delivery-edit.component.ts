import {Component, HostListener, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ORDER_TYPE_ITEM, STATE_ORDER, ACTION_ORDER, ORDER_RIGHTS} from 'src/app/utils/constant/index';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import {utils} from 'src/app/utils/utils';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {MatDialog} from '@angular/material/dialog';
import {ChooseVehicleComponent} from '../choose-vehicle/choose-vehicle.component';
import {item} from 'src/app/models/Business/stock.model';
import Swal from 'sweetalert2';
import OrderDeliveryService from 'src/app/services/SO/order-delivery.service';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-delivery-edit.component.html',
  styleUrls: ['./order-delivery-edit.component.scss'],
})
export class OrderDeliveryEditComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  item: any;
  orderForm: FormGroup;
  submitted: boolean = false;
  stateDetail: string = '';
  listItemDetails: any[] = [];
  filter = new OrderFilter();
  widthDeault: string = '0px';

  listPartnerAll: any = [];
  listVehicleAll: any = [];
  listShip: any = [];
  totalVehicle: number = 0;
  listTypeAll: any = [
    {
      name: 'Mua',
      value: 'BUY',
    },
    {
      name: 'Bán',
      value: 'SELL',
    },
  ];
  moneyTotal: any[] = [];
  phoneNumber: string = '';
  address: string = '';

  constructor(
    private _service: OrderDeliveryService,
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
      code: ['', [Validators.required]],
      orderDate: [new Date(), [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
      type: ['XUAT_HANG', [Validators.required]],
      expectNumber: '',
      vehicles: this._fb.array([]),
      shipCode: ['', [Validators.required]],
      note: [''],
      customsDeclaration: [''],
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

  GetDetail() {
    console.log(this.item);
    this.orderForm?.get('code')?.setValue(this.item.code);
    this.orderForm?.get('shipCode')?.setValue(this.item.shipCode);
    this.orderForm?.get('type')?.setValue(this.item.type);
    this.orderForm?.get('expectNumber')?.setValue(this.item.expectNumber);
    this.orderForm?.get('orderDate')?.setValue(this.item.orderDate);
    this.orderForm?.get('startDate')?.setValue(this.item.startDate);
    this.orderForm?.get('endDate')?.setValue(this.item.endDate);
    this.orderForm?.get('customsDeclaration')?.setValue(this.item.customsDeclaration);
    this.orderForm?.get('note')?.setValue(this.item.note);
    this.totalVehicle = this.item?.totalVehicle;

    this.listItemDetails = this.item.vehicles.map((element: any) => {
      this.addVehicle({
        vehicleCode: element.vehicle.code,
        unladenWeight: element.vehicle.unladenWeight,
      });
      return {
        vehicleCode: element.vehicle.code,
        unladenWeight: element.vehicle.unladenWeight,
        unitName: element.vehicle.unit?.name,
      };
    });
  }

  get orderDetails(): FormArray {
    return this.orderForm.get('vehicles') as FormArray;
  }

  createOrderDetails(params: any = null): FormGroup {
    return this._fb.group({
      vehicleCode: [params.vehicleCode || '', Validators.required],
      unladenWeight: params.unladenWeight,
    });
  }

  addVehicle(params: any = null) {
    this.orderDetails.push(this.createOrderDetails(params));
  }

  removeVehicle(index: number) {
    this.orderDetails.removeAt(index);
    this.listItemDetails.splice(index, 1);
  }

  GetShip() {
    this.dropdownService.GetAllShip().subscribe(
      ({data}) => {
        this.listShip = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  openChooseItem() {
    const dialogRef = this.dialog.open(ChooseVehicleComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
    dialogRef.componentInstance.listSelect = this.listItemDetails;
    dialogRef.afterClosed().subscribe((result: item[]) => {
      if (result) {
        this.totalVehicle = result.length;
        const orderDetails = this._fb.array([]);
        this.orderForm.setControl('vehicles', orderDetails);
        this.listItemDetails = result.map((itemA: any, index) => {
          const matchingItem: any = this.listItemDetails.find((itemB) => itemB.vehicleCode === itemA.vehicleCode);
          if (matchingItem) {
            this.addVehicle({
              vehicleCode: itemA.code || itemA.vehicleCode,
              unladenWeight: itemA.unladenWeight,
            });
            return matchingItem;
          }
          this.addVehicle({
            vehicleCode: itemA.code || itemA.vehicleCode,
            unladenWeight: itemA.unladenWeight,
          });
          return {
            vehicleCode: itemA.code || itemA.vehicleCode,
            unladenWeight: itemA.unladenWeight,
            unitName: itemA?.unitName,
          };
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
    this.GetDetail();
    this.GetShip();
  }

  get f() {
    return this.orderForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  onCreate() {
    this.submitted = true;

    if (!this.orderForm.valid) {
      console.log(this.orderForm.errors);
      return;
    }
    const orderDate = moment(this.orderForm.value?.orderDate).format('YYYY-MM-DDTHH:mm:ss');
    const endDate = moment(this.orderForm.value?.endDate).format('YYYY-MM-DDTHH:mm:ss');
    const startDate = moment(this.orderForm.value?.startDate).format('YYYY-MM-DDTHH:mm:ss');
    let objectInsert = {
      ...this.orderForm.value,
      endDate,
      startDate,
      orderDate: orderDate,
      orderBatchDetails: [
        {
          orderNumber: this.orderForm.value.expectNumber,
        },
      ],
      vehicles: this.orderForm.value?.vehicles.map((item: any) => {
        return {
          vehicleCode: item.vehicleCode,
        };
      }),
    };
    if (objectInsert.expectNumber == '') {
      Swal.fire({
        showCloseButton: true,
        title: 'Chưa nhập số lượng dự kiến',
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
        this.drawerService.returnData({
          ...data,
          create: true,
        });
        this.submitted = false;
        // const orderDetails = this._fb.array([]);
        // this.orderForm.setControl('orderDetails', orderDetails);
        // this.filter = {
        //   ...this.filter,
        //   code: data.data?.code,
        // };
        this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
