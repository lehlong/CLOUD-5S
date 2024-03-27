import {Component} from '@angular/core';
import {PricePolicyService} from 'src/app/services/MD/price-policy.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ITEMTYPE_RIGHTS} from 'src/app/utils/constant/index';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
@Component({
  selector: 'app-price-policy-create',
  templateUrl: './price-policy-create.component.html',
  styleUrls: ['./price-policy-create.component.scss'],
})
export class PricePolicyCreateComponent {
  wksForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  ITEMTYPE_RIGHTS = ITEMTYPE_RIGHTS;
  listAreaAll: any = [];
  listItemAll: any = [];
  constructor(
    private _service: PricePolicyService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
  ) {
    this.wksForm = this._fb.group({
      areaCode: ['', [Validators.required, this.utils.trimSpace]],
      itemCode: ['', [Validators.required, this.utils.trimSpace]],
      price: [0, [Validators.required, Validators.min(1)]],
      fromDate: ['', [Validators.required, this.utils.trimSpace]],
      toDate: '',
      note: ['', [this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.wksForm.controls;
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllArea();
    this.GetAllItem();
  }

  GetAllArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listAreaAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  close() {
    this.drawerService.close();
    this.wksForm?.get('areaCode')?.setValue('');
    this.wksForm?.get('itemCode')?.setValue('');
    this.wksForm?.get('fromDate')?.setValue('');
    this.wksForm?.get('toDate')?.setValue('');
    this.wksForm?.get('note')?.setValue('');
    this.wksForm?.get('price')?.setValue(0);
    this.wksForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    if (this.wksForm.invalid) {
      return;
    }
    let isoFormattedDateFD;
    let isoFormattedDateTD;

    if (this.wksForm.value.fromDate) {
      const inputTimeStringFD = this.wksForm.value.fromDate;
      const dateMomentFD = moment(inputTimeStringFD, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      isoFormattedDateFD = dateMomentFD.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    } else {
      isoFormattedDateFD = '';
    }
    if (this.wksForm.value.toDate) {
      const inputTimeStringTD = this.wksForm.value.toDate;
      const dateMomentTD = moment(inputTimeStringTD, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      isoFormattedDateTD = dateMomentTD.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    } else {
      isoFormattedDateTD = '';
    }

    let objInsert = {
      fromDate: isoFormattedDateFD,
      toDate: isoFormattedDateTD,
      areaCode: this.wksForm.value.areaCode.trim(),
      itemCode: this.wksForm.value.itemCode.trim(),
      price: this.wksForm.value.price,
      note: this.wksForm.value.note,
      isActive: this.wksForm.value.isActive,
    };

    this._service.Insert(objInsert).subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
