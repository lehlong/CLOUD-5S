import {Component, HostListener} from '@angular/core';
import {ContractService} from 'src/app/services/Business/contract.service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {ContractFilter} from 'src/app/@filter/Business/contract.filter';
import {utils} from 'src/app/utils/utils';
import {item} from 'src/app/models/Business/stock.model';
import {STATE_CONTRACT} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {ContractChooseItemComponent} from '../contract-choose-item/contract-choose-item.component';
import {CONTRACT_RIGHTS} from 'src/app/utils/constant/access-right';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss'],
})
export class ContractEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  contractForm: FormGroup;
  submitted: boolean = false;
  listStockAll: any = [];
  listPartnerAll: any = [];
  STATE_CONTRACT = STATE_CONTRACT;
  code: string = '';
  listItemDetails: item[] = [];
  filter = new ContractFilter();
  detailData: any = {};
  CONTRACT_RIGHTS = CONTRACT_RIGHTS;
  moneyTotal: any[] = [];
  listContractAll: any[] = [];
  detailsContract: any[] = [];

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
      // details: ['', [Validators.required]],
      partnerCode: ['', [Validators.required]],
      type: ['', [Validators.required]],
      // referenceId: ['', [Validators.required]],
      address: '',
      phoneNumber: '',
      code: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get importDetails(): FormArray {
    return this.contractForm.get('details') as FormArray;
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
        const savedImportDetails = this.contractForm.value.details;
        const details = this._fb.array([]);
        this.contractForm.setControl('details', details);
        this.listItemDetails = result.map((itemA) => {
          const savedImportDetail = savedImportDetails.find((itemB: any) => itemB.itemCode === itemA.code);
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
    this.GetAllPartner();
    this.GetDetail();
    this.GetAllContract();
  }

  GetDetail() {
    this._service
      .GetDetail({
        Id: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          this.detailsContract = data.details;

          this.moneyTotal = data?.details.map((element: any) => {
            return {...element, totalMoney: element?.sumMoney};
          });
          this.listItemDetails = data?.details.map((element: any) => {
            this.addDetails({
              itemCode: element?.item?.code,
              orderNumber: element?.orderNumber,
              price: element?.price,
              totalMoney: element?.sumMoney,
            });
            return {
              ...element?.item,
              orderNumber: element?.orderNumber,
              price: element?.price,
            };
          });

          this.contractForm.patchValue({
            startDate: data?.startDate ? moment(data.startDate).format('YYYY-MM-DD') : null,
            endDate: data?.endDate ? moment(data.endDate).format('YYYY-MM-DD') : null,
            releaseDate: data?.releaseDate ? moment(data.releaseDate).format('YYYY-MM-DD') : null,
            type: data.type,
            partner: data.partner || '',
            partnerCode: data.partnerCode || '',
            content: data?.content,
            note: data?.note,
            totalMoney: data.totalMoney,
            address: data.partner.address,
            phoneNumber: data.partner.phoneNumber,
            code: data.code,
          });
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
    return this.contractForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  selectPartner(value: string) {
    const partnerSelect = this.listPartnerAll.find((item: any) => item?.code == value);
    this.contractForm.get('address')?.setValue(partnerSelect?.address || '');
    this.contractForm.get('phoneNumber')?.setValue(partnerSelect?.phoneNumber || '');
  }

  onEdit() {
    this.submitted = true;
    if (this.contractForm.invalid) {
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
    let result = this.contractForm.value?.details.map((item: any) => {
      return {
        orderNumber: item.orderNumber,
        price: item.price,
        sumMoney: item.totalMoney,
      };
    });

    let details = this.detailsContract.map((item: any, index: any) => {
      return {
        ...item,
        orderNumber: result[index].orderNumber,
        price: result[index].price,
        sumMoney: result[index].sumMoney,
      };
    });

    this._service
      .Update({
        ...this.contractForm.value,
        details,
        // code: this.code,
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
