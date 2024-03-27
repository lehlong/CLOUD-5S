import {Component, HostListener} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ORDER_DELIVERY_RIGHTS} from 'src/app/utils/constant/index';
import {STATE_ORDER} from 'src/app/utils/constant/index';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {utils} from 'src/app/utils/utils';
import {LIST_PAYMENT_METHOD} from 'src/app/utils/constant/order-export';
import {ChooseVehicleComponent} from '../choose-vehicle/choose-vehicle.component';
import {item} from 'src/app/models/Business/stock.model';
import Swal from 'sweetalert2';
import {PurchasingstationService} from 'src/app/services/MD/purchasing-station.service';
import OrderDeliveryService from 'src/app/services/SO/order-delivery.service';
@Component({
  selector: 'app-order-create',
  templateUrl: './order-delivery-create.component.html',
  styleUrls: ['./order-delivery-create.component.scss'],
})
export class OrderDeliveryCreateComponent {
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
  listStationAll: any = [];
  listShip: any = [];
  totalVehicle: number = 0;
  moneyTotal: any[] = [];
  phoneNumber: string = '';
  address: string = '';
  numberInput: string = '';
  ORDER_DELIVERY_RIGHTS = ORDER_DELIVERY_RIGHTS;
  disabledDate = (current: Date): boolean => {
    return false;
  };

  constructor(
    private _service: OrderDeliveryService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private partnerService: PartnerService,
    private purchasingService: PurchasingstationService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.orderForm = this._fb.group({
      orderDate: [new Date(), [Validators.required]],
      startDate: [this.getDefaultStartDate(), [Validators.required]],
      endDate: [this.getDefaultEndDate(), [Validators.required]],
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

  getDefaultStartDate(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to 0 hours, 0 minutes, 0 seconds
    return today;
  }

  getDefaultEndDate(): Date {
    const today = new Date();
    // today.setHours(0, 0, 0, 0); // Set to 0 hours, 0 minutes, 0 seconds
    today.setDate(today.getDate() + 5); // Add 5 days
    return today;
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

  selectStation(event: any) {}
  GetAllStation() {
    this.purchasingService.GetAll().subscribe(
      ({data}) => (this.listStationAll = data),
      (error) => console.log(error),
    );
  }

  get orderDetails(): FormArray {
    return this.orderForm.get('vehicles') as FormArray;
  }

  createOrderDetails(params: any = null): FormGroup {
    return this._fb.group({
      vehicleCode: [params?.vehicleCode || '', Validators.required],
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
    // this.GetAllStation();
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
    if (this.orderForm.invalid) {
      return;
    }
    const orderDate = moment(this.orderForm.value?.orderDate).format('YYYY-MM-DDTHH:mm:ss');
    const startDate = moment(this.orderForm.value?.startDate).format('YYYY-MM-DDTHH:mm:ss');
    const endDate = moment(this.orderForm.value?.endDate).format('YYYY-MM-DDTHH:mm:ss');
    let objectInsert = {
      ...this.orderForm.value,
      orderDate,
      startDate,
      endDate,
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

    this._service.Insert(objectInsert).subscribe(
      (data) => {
        console.log(this.filter);
        console.log(this.route);
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

        // this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
