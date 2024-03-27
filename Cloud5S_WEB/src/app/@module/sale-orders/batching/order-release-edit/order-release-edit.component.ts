import {DatePipe} from '@angular/common';
import {Component, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {utils} from 'src/app/utils/utils';
import {OrderReleaseService} from 'src/app/services/SO/order-release.service';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {EORDER_RELEASE_STEPS} from 'src/app/utils/constant/orderRelease';
import {STATE_ORDER} from 'src/app/utils/constant';
import {ORDER_RELEASE_RIGHTS} from 'src/app/utils/constant/access-right';
import {AccountGetAllFilter} from 'src/app/@filter/Common/account.filter';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderReleaseFilter} from 'src/app/@filter/SO/order-release.filter';
@Component({
  selector: 'app-order-release-edit',
  templateUrl: './order-release-edit.component.html',
  styleUrls: ['./order-release-edit.component.scss'],
  providers: [DatePipe],
})
export class OrderReleaseEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  orderReleaseForm: FormGroup;
  submitted: boolean = false;
  itemDetail: any;
  filterGroup = new BaseFilter();
  filterAccount = new AccountGetAllFilter();
  optionsVehicle: any = [];
  optionsMixer: any = [];
  optionsAccount: any = [];
  filterVehicle = new BaseFilter();
  filterMixer = new BaseFilter();
  mixer: any;
  orderDetail: any;
  itemMain: any;
  itemSub: any;
  state_order = STATE_ORDER;
  ORDER_RELEASE_RIGHTS = ORDER_RELEASE_RIGHTS;
  filter = new OrderReleaseFilter();

  constructor(
    private _oss: OrderReleaseService,
    private _vs: VehicleService,
    private _ms: MixerService,
    private _fb: FormBuilder,
    private _ags: AccountGroupService,
    private utils: utils,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.orderReleaseForm = this._fb.group({
      code: [''],
      orderCode: ['', [Validators.required]],
      mixNumber: [null, [Validators.min(1), Validators.required]],
      sealNumber: [''],
      weightIn: [0],
      weightInTime: [null],
      weightOut: [0],
      weightOutTime: [null],
      mixVehicleCode: ['', [Validators.required]],
      mixerCode: ['', [Validators.required]],
      mixDriverUserName: [null, [Validators.required]],
      pumpDriverUserName: [null],
      mixDriverFullName: [null, [Validators.required]],
      pumpDriverFullName: [null],
      pumpVehicleCode: [null],
      mixDate: [''],
      state: [''],
      sand: [null, [Validators.required]],
      cement: [null, [Validators.required]],
      admixture: [null, [Validators.required]],
      water: [null, [Validators.required]],
      stone: [null, [Validators.required]],
    });
  }

  get f() {
    return this.orderReleaseForm.controls;
  }

  ngOnInit() {
    this.itemMain = this.orderDetail?.orderDetails?.find((item: any) => item.isMainItem);
    this.orderReleaseForm?.get('code')?.setValue(this.itemDetail?.code);
    this.orderReleaseForm?.get('state')?.setValue(this.itemDetail?.state);
    this.orderReleaseForm?.get('orderCode')?.setValue(this.itemDetail?.orderCode);
    this.orderReleaseForm?.get('mixNumber')?.setValue(this.utils.formatNumber(this.itemDetail?.mixNumber));
    this.orderReleaseForm?.get('sealNumber')?.setValue(this.itemDetail?.sealNumber);
    this.orderReleaseForm?.get('weightIn')?.setValue(this.itemDetail?.weightIn);
    this.orderReleaseForm?.get('weightInTime')?.setValue(this.itemDetail?.weightInTime);
    this.orderReleaseForm?.get('weightOut')?.setValue(this.itemDetail?.weightOut);
    this.orderReleaseForm?.get('weightOutTime')?.setValue(this.itemDetail?.weightOutTime);
    this.orderReleaseForm?.get('mixVehicleCode')?.setValue(this.itemDetail?.mixVehicleCode);
    this.orderReleaseForm?.get('mixerCode')?.setValue(this.itemDetail?.mixerCode);
    this.orderReleaseForm?.get('pumpVehicleCode')?.setValue(this.itemDetail?.pumpVehicleCode);
    this.orderReleaseForm?.get('mixDate')?.setValue(this.itemDetail?.mixDate);
    this.orderReleaseForm?.get('mixDriverUserName')?.setValue(this.itemDetail?.mixDriverUserName);
    this.orderReleaseForm?.get('mixDriverFullName')?.setValue(this.itemDetail?.mixDriver?.fullName);
    this.orderReleaseForm?.get('pumpDriverUserName')?.setValue(this.itemDetail?.pumpDriverUserName);
    this.orderReleaseForm?.get('pumpDriverFullName')?.setValue(this.itemDetail?.pumpDriver?.fullName);
    this.orderReleaseForm?.get('cement')?.setValue(this.itemDetail?.cement);
    this.orderReleaseForm?.get('sand')?.setValue(this.itemDetail?.sand);
    this.orderReleaseForm?.get('water')?.setValue(this.itemDetail?.water);
    this.orderReleaseForm?.get('admixture')?.setValue(this.itemDetail?.admixture);
    this.orderReleaseForm?.get('stone')?.setValue(this.itemDetail?.stone);

    this.mixer = this.itemDetail?.mixer;
    this.getAllAccount();
    this.getAllVehicle();
    this.getAllMixer();
  }

  close() {
    this.drawerService.close();
    this.orderReleaseForm?.get('code')?.setValue('');
    this.orderReleaseForm?.get('orderCode')?.setValue('');
    this.orderReleaseForm?.get('mixNumber')?.setValue(0);
    this.orderReleaseForm?.get('sealNumber')?.setValue('');
    this.orderReleaseForm?.get('weightIn')?.setValue(0);
    this.orderReleaseForm?.get('weightInTime')?.setValue(null);
    this.orderReleaseForm?.get('weightOut')?.setValue(0);
    this.orderReleaseForm?.get('weightOutTime')?.setValue(null);
    this.orderReleaseForm?.get('mixVehicleCode')?.setValue('');
    this.orderReleaseForm?.get('mixerCode')?.setValue('');
    this.orderReleaseForm?.get('mixDriverUserName')?.setValue('');
    this.orderReleaseForm?.get('pumpDriverUserName')?.setValue('');
    this.orderReleaseForm?.get('mixDriverFullName')?.setValue('');
    this.orderReleaseForm?.get('pumpDriverFullName')?.setValue('');
    this.orderReleaseForm?.get('pumpVehicleCode')?.setValue('');
    this.orderReleaseForm?.get('mixDate')?.setValue(null);

    this.orderReleaseForm?.get('sand')?.setValue('');
    this.orderReleaseForm?.get('admixture')?.setValue('');
    this.orderReleaseForm?.get('water')?.setValue('');
    this.orderReleaseForm?.get('stone')?.setValue('');
    this.orderReleaseForm?.get('cement')?.setValue('');
  }

  getAllAccount() {
    this.dropdownService.GetAllAccount(this.filterAccount).subscribe(
      (res) => {
        this.optionsAccount = res.data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getAllVehicle() {
    this._vs.search(this.filterVehicle).subscribe(
      (res) => {
        this.optionsVehicle = res.data.data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  getAllMixer() {
    this._ms.search(this.filterMixer).subscribe(
      (res) => {
        this.optionsMixer = res.data.data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onChangeAccountMix(e: any) {
    this.filterAccount.KeyWord = e;
    this.getAllAccount();
  }

  onChangeAccountPump(e: any) {
    this.filterAccount.KeyWord = e;
    this.getAllAccount();
  }

  onSelectAccountMix(item: any) {
    this.orderReleaseForm?.get('mixDriverUserName')?.setValue(item.userName);
    this.orderReleaseForm?.get('mixDriverFullName')?.setValue(item.fullName);
  }

  onSelectAccountPump(item: any) {
    this.orderReleaseForm?.get('pumpDriverUserName')?.setValue(item.userName);
    this.orderReleaseForm?.get('pumpDriverFullName')?.setValue(item.fullName);
  }

  onSelectItem(item: any) {
    this.orderReleaseForm?.get('mixVehicleCode')?.setValue(item.code);
    this.orderReleaseForm?.get('mixDriverFullName')?.setValue(item?.defaultDriver?.fullName || item.driver);
    this.orderReleaseForm?.get('mixDriverUserName')?.setValue(item?.defaultDriver?.userName || item.driver);
  }

  onChange(e: any) {
    this.filterVehicle.keyWord = e;
    this.getAllVehicle();
  }

  onChangePump(e: any) {
    this.filterVehicle.keyWord = e;
    this.getAllVehicle();
  }

  onSelectPump(item: any) {
    this.orderReleaseForm?.get('pumpVehicleCode')?.setValue(item.code);
    this.orderReleaseForm?.get('pumpDriverFullName')?.setValue(item?.defaultDriver?.fullName || item.driver);
    this.orderReleaseForm?.get('pumpDriverUserName')?.setValue(item?.defaultDriver?.userName || item.driver);
  }

  onChangeMix(e: any) {
    this.filterMixer.keyWord = e;
    this.getAllMixer();
  }

  onSelectMix(item: any) {
    this.orderReleaseForm?.get('mixerCode')?.setValue(item.code);
    this.mixer = item;
  }

  accumulatedNumber() {
    if (!this.orderDetail?.orderReleases) {
      return 0;
    }
    const orFinish = this.orderDetail?.orderReleases
      .filter(
        (i: any) => i?.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH || i?.state == EORDER_RELEASE_STEPS.DA_GIAO_HANG,
      )
      .map((os: any) => os.mixNumber);
    if (orFinish.length == 0) {
      return 0;
    }
    return (
      orFinish.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      }) || 0
    );
  }

  onEdit() {
    this.submitted = true;
    if (this.orderReleaseForm.invalid) {
      return;
    }
    this.orderReleaseForm.value.mixNumber = parseFloat(this.orderReleaseForm.value.mixNumber.replace(/,/g, ''));
    this._oss.Update(this.orderReleaseForm.value).subscribe(
      (data) => {
        this.accumulatedNumber();
        let orderRelease = {...this.orderReleaseForm.value, mixer: this.mixer};
        let orderCode = this.orderDetail.code;
        this.drawerService.returnData({
          ...data,
          orderRelease,
          orderCode,
          event: 'UPDATE_ORDER_RELEASE',
          openDetail: true,
        });
        this.submitted = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  isDisableButton() {
    return (
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH ||
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_BI_HUY ||
      this.itemDetail?.state == EORDER_RELEASE_STEPS.DA_GIAO_HANG ||
      this.itemDetail?.state === null
    );
  }
}
