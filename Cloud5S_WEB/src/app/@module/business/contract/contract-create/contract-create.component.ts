import {Component, HostListener} from '@angular/core';
import {ContractService} from 'src/app/services/Business/contract.service';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {ContractFilter} from 'src/app/@filter/Business/contract.filter';
import {utils} from 'src/app/utils/utils';
import {STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {ContractChooseItemComponent} from '../contract-choose-item/contract-choose-item.component';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {item} from 'src/app/models/Business/contract.model';
@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss'],
})
export class ContractCreateComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  contractForm: FormGroup;
  submitted: boolean = false;
  listStock: any = [];
  stateDetail: string = '';
  STATE_STOCK = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  listItemDetails: item[] = [];
  filter = new ContractFilter();
  widthDeault: string = '0px';
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;
  listPartnerAll: any = [];
  listStockAll: any = [];
  moneyTotal: any[] = [];
  listContractAll: any[] = [];

  constructor(
    private _service: ContractService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    public utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.contractForm = this._fb.group({
      startDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
      endDate: [moment().add(1, 'months').format('YYYY-MM-DD'), [Validators.required]],
      releaseDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
      note: '',
      content: '',
      details: this._fb.array([]),
      partnerCode: ['', [Validators.required]],
      type: ['', [Validators.required]],
      // referenceId: ['', [Validators.required]],
      address: '',
      phoneNumber: '',
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
        IsCustomer: true,
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

  get importDetails(): FormArray {
    return this.contractForm.get('details') as FormArray;
  }

  createDetails(params: any = null): FormGroup {
    return this._fb.group({
      itemCode: [params?.itemCode || '', Validators.required],
      orderNumber: [params?.orderNumber || '', Validators.required],
      price: [params?.price || '', Validators.required],
      totalMoney: params?.totalMoney,
    });
  }

  addDetails(params: any = null) {
    this.importDetails.push(this.createDetails(params));
  }

  removeDetails(index: number) {
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
    const dialogRef = this.dialog.open(ContractChooseItemComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
    dialogRef.componentInstance.listSelect = this.listItemDetails;
    dialogRef.afterClosed().subscribe((result: item[]) => {
      if (result) {
        const savedDetails = this.contractForm.value.details;
        const details = this._fb.array([]);
        this.contractForm.setControl('details', details);
        this.listItemDetails = result.map((itemA) => {
          const savedImportDetail = savedDetails.find((itemB: any) => itemB.itemCode === itemA.code);
          const matchingItem: any = this.listItemDetails.find((itemB: any) => itemB.code === itemA.code);
          if (matchingItem) {
            this.addDetails(savedImportDetail);
            return matchingItem;
          }
          this.addDetails({
            itemCode: itemA?.code || '',
            orderNumber: '',
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
    this.GetAllContract();
  }

  GetAllContract() {
    this.listContractAll = [
      {
        name: 'Hợp đồng mua',
        value: 'MUA',
      },
      {
        name: 'Hợp đồng bán',
        value: 'BAN',
      },
    ];
  }

  get f() {
    return this.contractForm.controls;
  }

  selectPartner(value: string) {
    const partnerSelect = this.listPartnerAll.find((item: any) => item?.code == value);
    this.contractForm.get('address')?.setValue(partnerSelect?.address || '');
    this.contractForm.get('phoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
  }

  textQuantity(e: any, i: number) {
    let tmpQuantity = e?.target?.value.replace(/,/g, '');
    let tmpCostPrice = String(this.listItemDetails[i].costPrice).replace(/,/g, '');
    const moneyTotal = tmpQuantity * Number(tmpCostPrice) || 0;
    const data = this.contractForm.value.details;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      }
      return item;
    });

    this.moneyTotal = updatedData;
    this.contractForm.get('details')?.setValue(updatedData);
  }

  textPrice(e: any, i: number) {
    let tmpPrice = e?.target?.value.replace(/,/g, '');
    let tmpQuantity = String(this.contractForm.value.details[i].orderNumber);
    const moneyTotal = tmpPrice * Number(tmpQuantity);
    const data = this.contractForm.value.details;
    const updatedData = data.map((item: any, index: number) => {
      if (index === i) {
        return {...item, totalMoney: moneyTotal};
      }
      return item;
    });
    this.moneyTotal = updatedData;
    this.contractForm.get('details')?.setValue(updatedData);
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
    if (this.contractForm.invalid) {
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
      startDate: this.contractForm.value?.startDate,
      endDate: this.contractForm.value?.endDate,
      releaseDate: this.contractForm.value?.releaseDate,
      partnerCode: this.contractForm.value.partnerCode,
      type: this.contractForm.value.type,
      note: this.contractForm.value.note,
      content: this.contractForm.value.content,
      details: this.contractForm.value?.details.map((item: any) => {
        const {totalMoney, ...rest} = item;
        const price = rest.price;
        return {
          ...rest,
          price,
        };
      }),
    };

    if (!objectInsert.details.length) {
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
        const details = this._fb.array([]);
        this.contractForm.setControl('details', details);
        this.contractForm.get('note')?.setValue('');
        this.close();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
