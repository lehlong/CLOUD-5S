import {Component} from '@angular/core';
import {DebtService} from 'src/app/services/SO/debt.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {STATE_DEBT, ACTION_DEBT} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {DebtFilter} from 'src/app/@filter/SO/debt.filter';
import {utils} from 'src/app/utils/utils';
import {DEBT_RIGHTS} from 'src/app/utils/constant/access-right';
@Component({
  selector: 'app-debt-edit',
  templateUrl: './debt-edit.component.html',
  styleUrls: ['./debt-edit.component.scss'],
})
export class DebtEditComponent {
  STATE_DEBT = STATE_DEBT;
  ACTION_DEBT = ACTION_DEBT;
  debtForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  filter = new DebtFilter();
  showButton = {
    confirm: false,
  };
  detailData: any = {};
  intoMoneyMain: string = '';
  intoMoneySub: string = '';
  intoMoneyTotal: string = '';
  stateDetail: string = '';
  DEBT_RIGHTS = DEBT_RIGHTS;

  constructor(
    private _service: DebtService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private router: Router,
    public utils: utils,
    private route: ActivatedRoute,
  ) {
    this.debtForm = this._fb.group({
      unitPriceMain: ['', [Validators.required]],
      unitPriceSub: ['', [Validators.required]],
      disCount: '',
      taxVAT: '',
      payMoney: '',
      totalMoney: [{value: '', disabled: true}],
      debt: [{value: '', disabled: true}],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetDetail();
  }

  enterUnitPriceMain(e: any) {
    try {
      if (e.target.value == '') {
        this.intoMoneyMain = '';
      } else {
        if (
          !this.detailData?.orderDetails?.[0]?.releaseNumber ||
          this.detailData?.orderDetails?.[0]?.releaseNumber == ''
        ) {
          this.intoMoneyMain = '0';
        } else {
          const releaseNumber: number =
            typeof this.detailData?.orderDetails?.[0]?.releaseNumber == 'number'
              ? this.detailData?.orderDetails?.[0]?.releaseNumber
              : parseFloat(this.detailData?.orderDetails?.[0]?.releaseNumber.replace(/,/g, ''));
          const intoMoneyMainNumber: number = parseFloat(e.target.value.replace(/,/g, '')) * releaseNumber;
          this.intoMoneyMain = intoMoneyMainNumber.toString();
        }
      }
      const intoMoneyMain = this.intoMoneyMain == '' ? 0 : parseFloat(this.intoMoneyMain.replace(/,/g, ''));
      const intoMoneySub = this.intoMoneySub == '' ? 0 : parseFloat(this.intoMoneySub.replace(/,/g, ''));
      if (this.intoMoneyMain == '' && this.intoMoneySub == '') {
        this.intoMoneyTotal = '';
        this.debtForm.get('totalMoney')?.setValue('');
        this.debtForm.get('debt')?.setValue('');
      } else {
        this.intoMoneyTotal = `${intoMoneyMain + intoMoneySub}`;
        const disCount: number =
          this.debtForm?.value?.disCount == '' ? 0 : parseFloat(this.debtForm?.value?.disCount.replace(/,/g, ''));
        const taxVAT: number =
          this.debtForm?.value?.taxVAT == '' ? 0 : parseFloat(this.debtForm?.value?.taxVAT.replace(/,/g, ''));
        const payMoney: number =
          this.debtForm?.value?.payMoney == '' ? 0 : parseFloat(this.debtForm?.value?.payMoney.replace(/,/g, ''));
        const intoMoneyTotal = intoMoneyMain + intoMoneySub;
        const totalMoney: number = intoMoneyTotal - intoMoneyTotal * (disCount / 100) + intoMoneyTotal * (taxVAT / 100);
        this.debtForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
        this.debtForm.get('debt')?.setValue(this.utils.formatNumber(totalMoney - payMoney));
      }
    } catch (e) {
      console.log(e);
    }
  }

  enterUnitPriceSub(e: any) {
    try {
      if (e.target.value == '') {
        this.intoMoneySub = '';
      } else {
        if (
          !this.detailData?.orderDetails?.[1]?.releaseNumber ||
          this.detailData?.orderDetails?.[1]?.releaseNumber == ''
        ) {
          this.intoMoneySub = '0';
        } else {
          const releaseNumber: number =
            typeof this.detailData?.orderDetails?.[1]?.releaseNumber == 'number'
              ? this.detailData?.orderDetails?.[1]?.releaseNumber
              : parseFloat(this.detailData?.orderDetails?.[1]?.releaseNumber.replace(/,/g, ''));
          const intoMoneySubNumber: number = parseFloat(e.target.value.replace(/,/g, '')) * releaseNumber;
          this.intoMoneySub = intoMoneySubNumber.toString();
        }
      }
      const intoMoneyMain = this.intoMoneyMain == '' ? 0 : parseFloat(this.intoMoneyMain.replace(/,/g, ''));
      const intoMoneySub = this.intoMoneySub == '' ? 0 : parseFloat(this.intoMoneySub.replace(/,/g, ''));
      if (this.intoMoneyMain == '' && this.intoMoneySub == '') {
        this.intoMoneyTotal = '';
        this.debtForm.get('totalMoney')?.setValue('');
        this.debtForm.get('debt')?.setValue('');
      } else {
        this.intoMoneyTotal = `${intoMoneyMain + intoMoneySub}`;
        const disCount: number =
          this.debtForm?.value?.disCount == '' ? 0 : parseFloat(this.debtForm?.value?.disCount.replace(/,/g, ''));
        const taxVAT: number =
          this.debtForm?.value?.taxVAT == '' ? 0 : parseFloat(this.debtForm?.value?.taxVAT.replace(/,/g, ''));
        const payMoney: number =
          this.debtForm?.value?.payMoney == '' ? 0 : parseFloat(this.debtForm?.value?.payMoney.replace(/,/g, ''));
        const intoMoneyTotal = intoMoneyMain + intoMoneySub;
        const totalMoney: number = intoMoneyTotal - intoMoneyTotal * (disCount / 100) + intoMoneyTotal * (taxVAT / 100);

        this.debtForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
        this.debtForm.get('debt')?.setValue(this.utils.formatNumber(totalMoney - payMoney));
      }
    } catch (e) {
      console.log(e);
    }
  }

  enterDisCount(e: any) {
    try {
      const value = e?.target?.value.replace(/,/g, '') || e;
      const disCount: number = value == '' ? 0 : parseFloat(value);
      const taxVAT: number =
        this.debtForm.get('taxVAT')?.value == '' ? 0 : parseFloat(this.debtForm.get('taxVAT')?.value);
      const intoMoneyTotal = this.intoMoneyTotal == '' ? 0 : parseFloat(this.intoMoneyTotal.replace(/,/g, ''));
      const totalMoney: number = intoMoneyTotal - intoMoneyTotal * (disCount / 100) + intoMoneyTotal * (taxVAT / 100);
      if (value == '' && this.debtForm.get('taxVAT')?.value == '' && this.intoMoneyTotal == '') {
        this.debtForm.get('totalMoney')?.setValue('');
        this.debtForm.get('debt')?.setValue('');
      } else {
        const payMoney =
          this.debtForm.value?.payMoney == '' ? 0 : parseFloat(this.debtForm.value?.payMoney);
        this.debtForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
        this.debtForm.get('debt')?.setValue(this.utils.formatNumber(totalMoney - payMoney));
      }
    } catch (e) {
      console.log(e);
    }
  }

  enterTaxVAT(e: any) {
    try {
      const value = e?.target?.value.replace(/,/g, '') || e;
      const taxVAT: number = value == '' ? 0 : parseFloat(value);
      const disCount: number =
        this.debtForm.get('disCount')?.value == ''
          ? 0
          : parseFloat(this.debtForm.get('disCount')?.value);
      const intoMoneyTotal = this.intoMoneyTotal == '' ? 0 : parseFloat(this.intoMoneyTotal.replace(/,/g, ''));
      const totalMoney: number = intoMoneyTotal - intoMoneyTotal * (disCount / 100) + intoMoneyTotal * (taxVAT / 100);
      if (value == '' && this.debtForm.get('disCount')?.value == '' && this.intoMoneyTotal == '') {
        this.debtForm.get('totalMoney')?.setValue('');
      } else {
        const payMoney =
          this.debtForm.value?.payMoney == '' ? 0 : parseFloat(this.debtForm.value?.payMoney);
        this.debtForm.get('totalMoney')?.setValue(this.utils.formatNumber(totalMoney));
        this.debtForm.get('debt')?.setValue(this.utils.formatNumber(totalMoney - payMoney));
      }
    } catch (e) {
      console.log(e);
    }
  }

  enterPayMoney(e: any) {
    try {
      const value = e?.target?.value.replace(/,/g, '') || e;
      const payMoney: number = value == '' ? 0 : parseFloat(value);
      const totalMoney: number =
        this.debtForm.get('totalMoney')?.value.replace(/,/g, '') == ''
          ? 0
          : parseFloat(this.debtForm.get('totalMoney')?.value.replace(/,/g, ''));
      const debt: number = totalMoney - payMoney;
      if (value == '' && this.debtForm.get('totalMoney')?.value == '') {
        this.debtForm.get('debt')?.setValue('');
      } else {
        this.debtForm.get('debt')?.setValue(this.utils.formatNumber(debt));
      }
    } catch (e) {
      console.log(e);
    }
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.showButton = {
            confirm: data?.state === this.STATE_DEBT['DA_TRON_XONG'].value,
          };

          this.detailData = data;
          this.stateDetail = data?.state;
          this.intoMoneyMain = data?.orderDetails?.[0]?.sumMoney ? `${data?.orderDetails?.[0]?.sumMoney}` : '';
          this.intoMoneySub = data?.orderDetails?.[1]?.sumMoney ? `${data?.orderDetails?.[1]?.sumMoney}` : '';
          if (this.intoMoneyMain == '' && this.intoMoneySub == '') {
            this.intoMoneyTotal = '';
          } else {
            const intoMoneyMain = this.intoMoneyMain && this.intoMoneyMain != '' ? parseFloat(this.intoMoneyMain) : 0;
            const intoMoneySub = this.intoMoneySub && this.intoMoneySub != '' ? parseFloat(this.intoMoneySub) : 0;
            this.intoMoneyTotal = `${this.utils.formatNumber(intoMoneyMain + intoMoneySub)}`;
          }
          if (data?.orderDetails?.length < 2) {
            this.debtForm.controls['unitPriceSub'].clearValidators();
            this.debtForm.controls['unitPriceSub'].updateValueAndValidity();
          }
          this.debtForm.patchValue({
            unitPriceMain: this.utils.formatNumber(data?.orderDetails?.[0]?.price) || '',
            unitPriceSub: this.utils.formatNumber(data?.orderDetails?.[1]?.price) || '',
            disCount: data?.export?.discount || '',
            taxVAT: data?.export?.taxVat || '',
            payMoney: data?.export?.payMoney || '',
            totalMoney: this.utils.formatNumber(data?.export?.sumMoney) || this.intoMoneyTotal,
            debt: this.utils.formatNumber(data?.export?.debt) || '',
          });
          this.debtForm.patchValue({});
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  get f() {
    return this.debtForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  debtClosing() {
    this.submitted = true;
    if (this.debtForm.invalid) {
      return;
    }

    Swal.fire({
        showCloseButton: true,
      title: 'Chốt sản lượng?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        const orderDetails = this.detailData.orderDetails?.map((item: any, index: number) => {
          return {
            id: item.id,
            price:
              index == 0
                ? parseFloat(this.debtForm.value.unitPriceMain.replace(/,/g, ''))
                : parseFloat(this.debtForm.value.unitPriceSub.replace(/,/g, '')),
          };
        });
        this._service
          .DebtCloseState({
            orderCode: this.detailData?.code,
            exportDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            disCount:
              this.debtForm.value.disCount == '' ? 0 : this.debtForm.value.disCount,
            taxVAT: this.debtForm.value.taxVAT == '' ? 0 : this.debtForm.value.taxVAT,
            payMoney:
              this.debtForm.value.payMoney == '' ? 0 : this.debtForm.value.payMoney,
            orderDetails: orderDetails,
          })
          .subscribe(
            (data) => {
              this.detailData = {
                ...this.detailData,
                state: this.STATE_DEBT['DA_HOAN_THANH'].value,
              };

              this.drawerService.returnData(data);
              this.submitted = false;

              this.showButton = {
                confirm: false,
              };
            },
            (error) => {
              console.log('error: ', error);
            },
          );
      }
    });
  }
}
