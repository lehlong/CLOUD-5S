import {Component} from '@angular/core';
import {PricePolicyService} from 'src/app/services/MD/price-policy.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PricePolicyFilter} from 'src/app/@filter/MD/price-policy.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ITEMTYPE_RIGHTS} from 'src/app/utils/constant/index';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import * as moment from 'moment';
@Component({
  selector: 'app-price-policy-edit',
  templateUrl: './price-policy-edit.component.html',
  styleUrls: ['./price-policy-edit.component.scss']
})
export class PricePolicyEditComponent {
  prpForm: FormGroup;
  submitted: boolean = false;
  isActive: boolean | null = null;
  filter = new PricePolicyFilter();
  optionsGroup: optionsGroup[] = [];
  ITEMTYPE_RIGHTS = ITEMTYPE_RIGHTS;
  filterGroup = new BaseFilter();

  id: string = '';
  areaCode: string = '';
  itemCode: string = '';
  fromDate: string = '';
  toDate: string = '';
  price: number = 0;
  note: string = '';

  listArea: any = [];
  listItem: any = [];

  constructor(
    private _service: PricePolicyService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownService: DropdownService,
  ) {
    this.prpForm = this._fb.group({
      areaCode: ['', [Validators.required, this.utils.trimSpace]],
      itemCode: ['', [Validators.required, this.utils.trimSpace]],
      fromDate: ['', [Validators.required, this.utils.trimSpace]],
      toDate: '',
      price: [0, [Validators.required, Validators.min(1)]],
      note: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.prpForm.controls;
  }

  GetAllArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listArea = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItem = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  loadInit(){
     this.GetAllArea();
     this.GetAllItem();
  }

  ngOnInit() {
    this.loadInit();
    this.prpForm?.get('areaCode')?.setValue(this.areaCode);
    this.prpForm?.get('itemCode')?.setValue(this.itemCode);
    this.prpForm?.get('fromDate')?.setValue(this.fromDate);
    this.prpForm?.get('toDate')?.setValue(this.toDate);
    this.prpForm?.get('price')?.setValue(this.price);
    this.prpForm?.get('note')?.setValue(this.note);
    this.prpForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      id:'',
      areaCode: '',
      itemCode: '',
      fromDate: '',
      toDate: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.prpForm?.get('areaCode')?.setValue('');
    this.prpForm?.get('itemCode')?.setValue('');
    this.prpForm?.get('fromDate')?.setValue('');
    this.prpForm?.get('toDate')?.setValue('');
    this.prpForm?.get('price')?.setValue(0);
  }

  onEdit() {
    this.submitted = true;
    if (this.prpForm.invalid) {
      return;
    }

    const _fromDate = moment(this.prpForm.value.fromDate).format('DD/MM/YYYY');
    const _toDate = moment(this.prpForm.value.toDate).format('DD/MM/YYYY');
    const isoFromDate = moment.utc(_fromDate, 'DD/MM/YYYY').toISOString() || '';
    const isoToDate = moment.utc(_toDate, 'DD/MM/YYYY').toISOString() || '';

    const objUpdate = {
      id: this.id ,
      areaCode: this.prpForm.value.areaCode.trim(),
      itemCode: this.prpForm.value.itemCode.trim(),
      price: this.prpForm.value.price ,
      note: this.prpForm.value.note.trim(),
      isActive : this.prpForm.value.isActive,
      fromDate: isoFromDate,
      toDate: isoToDate,
    }

    this._service
      .Update(objUpdate)
      .subscribe(
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
