import {Component, HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {optionsGroup} from 'src/app/@filter/Common/account.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {MixerService} from 'src/app/services/MD/mixer.service';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {OrderReleaseService} from 'src/app/services/SO/order-release.service';
import {STATE_ORDER} from 'src/app/utils/constant';
import {ORDER_RELEASE_RIGHTS} from 'src/app/utils/constant/access-right';
import {EORDER_RELEASE_STEPS} from 'src/app/utils/constant/orderRelease';
import {utils} from 'src/app/utils/utils';
import {OrderReleaseInfoComponent} from '../order-release-info/order-release-info.component';
import {OrderReleaseFilter} from 'src/app/@filter/SO/order-release.filter';
import {ActivatedRoute, Router} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {AccountGetAllFilter} from 'src/app/@filter/Common/account.filter';
@Component({
  selector: 'app-order-release-create',
  templateUrl: './order-release-create.component.html',
  styleUrls: ['./order-release-create.component.scss'],
})
export class OrderReleaseCreateComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  orderReleaseForm: FormGroup;
  submitted: boolean = false;
  itemDetail: any;
  filterGroup = new BaseFilter();
  optionsGroup: optionsGroup[] = [];
  orderCode: string = '';
  filterVehicle = new BaseFilter();
  filterAccount = new AccountGetAllFilter();
  optionsVehicle: any = [];
  orderDetail: any;
  optionsMixer: any = [];
  optionsAccount: any = [];
  filterMixer = new BaseFilter();
  itemMain: any;
  mixer: any;
  now: string = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16);
  state_order = STATE_ORDER;
  ORDER_RELEASE_RIGHTS = ORDER_RELEASE_RIGHTS;
  filter = new OrderReleaseFilter();
  date: any;

  constructor(
    private _oss: OrderReleaseService,
    private _fb: FormBuilder,
    private _ms: MixerService,
    private dropdownService: DropdownService,
    private utils: utils,
    private _vs: VehicleService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;

    this.orderReleaseForm = this._fb.group({
      orderCode: ['', Validators.required],
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
      mixDate: [this.now],
      sand: [0, [Validators.required]],
      cement: [0, [Validators.required]],
      water: [0, [Validators.required]],
      admixture: [0, [Validators.required]],
      stone: [0, [Validators.required]],
    });
  }

  get f() {
    return this.orderReleaseForm.controls;
  }

  ngOnInit() {
    this.orderReleaseForm?.get('orderCode')?.setValue(this.orderCode || '');
    this.getAllVehicle();
    this.getAllAccount();
    this.getAllMixer();
    this.itemMain = this.orderDetail?.orderDetails?.find((item: any) => item.isMainItem);

    const itemFormula = this.itemMain.item.itemFormula;

    this.orderReleaseForm.controls['sand'].setValue(itemFormula.sand);
    this.orderReleaseForm.controls['water'].setValue(itemFormula.water);
    this.orderReleaseForm.controls['cement'].setValue(itemFormula.cement);
    this.orderReleaseForm.controls['admixture'].setValue(itemFormula.admixture);
    this.orderReleaseForm.controls['stone'].setValue(itemFormula.stone);
  }

  close() {
    this.drawerService.close();
    this.orderReleaseForm?.get('orderCode')?.setValue('');
    this.orderReleaseForm?.get('mixNumber')?.setValue(0);
    this.orderReleaseForm?.get('sealNumber')?.setValue('');
    this.orderReleaseForm?.get('weightIn')?.setValue(0);
    this.orderReleaseForm?.get('weightInTime')?.setValue(null);
    this.orderReleaseForm?.get('weightOut')?.setValue(0);
    this.orderReleaseForm?.get('weightOutTime')?.setValue(null);
    this.orderReleaseForm?.get('mixVehicleCode')?.setValue('');
    this.orderReleaseForm?.get('mixDriverUserName')?.setValue('');
    this.orderReleaseForm?.get('pumpDriverUserName')?.setValue('');
    this.orderReleaseForm?.get('mixDriverFullName')?.setValue('');
    this.orderReleaseForm?.get('pumpDriverFullName')?.setValue('');
    this.orderReleaseForm?.get('mixerCode')?.setValue('');
    this.orderReleaseForm?.get('pumpVehicleCode')?.setValue('');
    this.orderReleaseForm?.get('mixDate')?.setValue(null);
    this.orderReleaseForm?.get('sand')?.setValue('');
    this.orderReleaseForm?.get('water')?.setValue('');
    this.orderReleaseForm?.get('stone')?.setValue('');
    this.orderReleaseForm?.get('cement')?.setValue('');
    this.orderReleaseForm?.get('admixture')?.setValue('');
  }
  getAllVehicle() {
    this.dropdownService.GetAllVehicle(this.filterVehicle).subscribe(
      (res) => {
        this.optionsVehicle = res.data;
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
      .filter((i: any) => i.state == EORDER_RELEASE_STEPS.DA_HOAN_THANH || i.state == EORDER_RELEASE_STEPS.DA_GIAO_HANG)
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
  onCreate() {
    this.submitted = true;
    if (this.orderReleaseForm.invalid) {
      return;
    }
    this.orderReleaseForm.value.mixNumber = parseFloat(this.orderReleaseForm.value.mixNumber.replace(/,/g, ''));
    this._oss
      .Insert({
        ...this.orderReleaseForm.value,
      })
      .subscribe(
        (data) => {
          const result = {...data.data, mixer: this.mixer};
          this.drawerService.returnData({...data, data: result, event: 'CREATE_ORDER_RELEASE', openDetail: true});
          this.submitted = false;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
