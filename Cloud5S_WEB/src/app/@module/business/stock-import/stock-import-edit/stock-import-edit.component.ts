import {Component, HostListener} from '@angular/core';
import {StockImportService} from 'src/app/services/Business/stock-import.service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {utils} from 'src/app/utils/utils';
import {item} from 'src/app/models/Business/stock.model';
import {STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {StockChooseItemComponent} from '../stock-choose-item/stock-choose-item.component';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';

@Component({
  selector: 'app-stock-import-edit',
  templateUrl: './stock-import-edit.component.html',
  styleUrls: ['./stock-import-edit.component.scss'],
})
export class StockImportEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  stockForm: FormGroup;
  submitted: boolean = false;
  listStockAll: any = [];
  listPartnerAll: any = [];
  STATE_STOCK = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  code: string = '';
  listItemDetails: item[] = [];
  filter = new StockImportFilter();
  detailData: any = {};
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;
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

  get importDetails(): FormArray {
    return this.stockForm.get('importDetails') as FormArray;
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

  showDetail() {
    this.drawerService.returnData({
      openDetail: true,
      code: this.code,
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllStock();
    this.GetAllPartner();
    this.GetDetail();
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          this.moneyTotal = data?.importDetails.map((element: any) => {
            return {...element, totalMoney: element?.sumMoney};
          });
          this.listItemDetails = data?.importDetails.map((element: any) => {
            this.addImportDetails({
              itemCode: element?.item?.code,
              stockCode: element?.stock?.code,
              amount: element?.amount,
              price: element?.price,
              note: element?.note,
              totalMoney: element?.sumMoney,
            });
            return {
              ...element?.item,
              stock: element?.stock,
              note: element?.note,
              amount: element?.amount,
              price: element?.price,
            };
          });
          this.stockForm.patchValue({
            importDate: data?.importDate ? moment(data.importDate).format('YYYY-MM-DD') : null,
            note: data?.note || '',
            partnerCode: data.partner.code || '',
            stockCode: data.stock.code || '',
          });
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStockAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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

  get f() {
    return this.stockForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.stockForm.invalid) {
      Swal.fire({
        showCloseButton: true,
        title: 'Nhập đủ thông tin cần thiết',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    this._service
      .Update({
        ...this.stockForm.value,
        importDetails: this.stockForm.value?.importDetails.map((item: any) => {
          return {
            ...item,
            amount: item?.amount,
            price: item?.price,
            stockCode: this.stockForm.value.stockCode,
          };
        }),
        code: this.code,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData({
            code: this.code,
            openDetail: true,
          });
          this.submitted = false;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
