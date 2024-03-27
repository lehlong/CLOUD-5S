import {Component, HostListener} from '@angular/core';
import {StockImportService} from 'src/app/services/Business/stock-import.service';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {utils} from 'src/app/utils/utils';
import {STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {StockChooseItemComponent} from '../stock-choose-item/stock-choose-item.component';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {item} from 'src/app/models/Business/stock.model';
@Component({
  selector: 'app-stock-import-create',
  templateUrl: './stock-import-create.component.html',
  styleUrls: ['./stock-import-create.component.scss'],
})
export class StockImportCreateComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  stockForm: FormGroup;
  submitted: boolean = false;
  listStock: any = [];
  stateDetail: string = '';
  STATE_STOCK = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  listItemDetails: item[] = [];
  filter = new StockImportFilter();
  widthDeault: string = '0px';
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;
  listPartnerAll: any = [];
  listStockAll: any = [];
  moneyTotal: any[] = [];

  constructor(
    private _service: StockImportService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.stockForm = this._fb.group({
      importDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
      note: '',
      importDetails: this._fb.array([]),
      partnerCode: ['', [Validators.required]],
      stockCode: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  GetAllPartner() {
    this.dropdownService
      .GetAllPartner({
        IsProvider: true,
      })
      .subscribe(
        ({data}) => {
          this.listPartnerAll = data;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  selectStock(value: any) {
    const data = this.stockForm.value.importDetails;
    const updatedData = data.map((item: any) => {
      return {...item, stockCode: value};
    });
    this.stockForm.get('importDetails')?.setValue(updatedData);
  }

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

  get importDetails(): FormArray {
    return this.stockForm.get('importDetails') as FormArray;
  }

  createImportDetails(params: any = null): FormGroup {
    return this._fb.group({
      itemCode: [params?.itemCode || '', Validators.required],
      stockCode: [params?.stockCode || '', Validators.required],
      amount: [params?.amount || '', Validators.required],
      price: [params?.price || '', Validators.required],
      note: params?.note || '',
      totalMoney: params?.totalMoney,
    });
  }

  addImportDetails(params: any = null) {
    this.importDetails.push(this.createImportDetails(params));
  }

  removeImportDetails(index: number) {
    this.importDetails.removeAt(index);
    this.listItemDetails.splice(index, 1);
  }

  getControl(group: any, controlName: string): FormControl {
    const control = group.get(controlName);
    if (control instanceof FormControl) {
      return control;
    }
    throw new Error(`Control ${controlName} not found in group`);
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
        const savedImportDetails = this.stockForm.value.importDetails;
        const importDetails = this._fb.array([]);
        this.stockForm.setControl('importDetails', importDetails);
        this.listItemDetails = result.map((itemA) => {
          const savedImportDetail = savedImportDetails.find((itemB: any) => itemB.itemCode === itemA.code);
          const matchingItem: any = this.listItemDetails.find((itemB: any) => itemB.code === itemA.code);
          if (matchingItem) {
            this.addImportDetails(savedImportDetail);
            return matchingItem;
          }
          this.addImportDetails({
            itemCode: itemA?.code || '',
            stockCode: this.stockForm.value.stockCode,
            amount: '',
            note: '',
            price: itemA?.costPrice,
          });
          return itemA;
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
  }

  get f() {
    return this.stockForm.controls;
  }

  textQuantity(e: any, i: number) {
    let tmpQuantity = e?.target?.value.replace(/,/g, '');
    let tmpCostPrice = String(this.listItemDetails[i].costPrice).replace(/,/g, '');
    const moneyTotal = tmpQuantity * Number(tmpCostPrice) || 0;
    const data = this.stockForm.value.importDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.stockForm.get('importDetails')?.setValue(updatedData);
  }

  textPrice(e: any, i: number) {
    let tmpPrice = e?.target?.value.replace(/,/g, '');
    let tmpQuantity = String(this.stockForm.value.importDetails[i].amount);
    const moneyTotal = tmpPrice * Number(tmpQuantity);
    const data = this.stockForm.value.importDetails;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.stockForm.get('importDetails')?.setValue(updatedData);
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
    if (this.stockForm.invalid) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng nhập đủ thông tin còn trống',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    let objectInsert = {
      importDate: this.stockForm.value?.importDate,
      partnerCode: this.stockForm.value.partnerCode,
      stockCode: this.stockForm.value.stockCode,
      note: this.stockForm.value.note,
      importDetails: this.stockForm.value?.importDetails.map((item: any) => {
        const {totalMoney, ...rest} = item;
        const amount = rest.amount;
        const price = rest.price;
        return {
          ...rest,
          amount,
          price,
          importDate: this.stockForm.value?.importDate,
        };
      }),
    };
    if (!objectInsert.importDetails.length) {
      Swal.fire({
        showCloseButton: true,
        title: 'Chưa thêm các sản phẩm nhập kho',
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
        const importDetails = this._fb.array([]);
        this.stockForm.setControl('importDetails', importDetails);
        this.stockForm.get('note')?.setValue('');
        this.close();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
