import {Component, HostListener} from '@angular/core';
import {CustomerCareService} from 'src/app/services/Business/customer-care.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CustomerListOrderComponent} from '../customer-list-order/customer-list-order.component';
import {STATE_ORDER} from 'src/app/utils/constant/index';
import {CUSTOMER_SUPPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer-care-create',
  templateUrl: './customer-care-create.component.html',
  styleUrls: ['./customer-care-create.component.scss'],
})
export class CustomerCareCreateComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  widthCustome: string = '700px';
  ctcForm: FormGroup;
  submitted: boolean = false;
  displayDate: string | null = 'Ngày chăm sóc';

  listPartnerAll: any = [];
  // listPartnerFilter: any = [];

  partnerCode: string = '';
  codeOrder: string = '';
  dateOrder: string = '';
  itemOrder: string = '';
  phoneOrder: string = '';
  statusOrder: string = '';
  partnerName: string = '';

  showOrderCode: boolean = false;

  state_order = STATE_ORDER;
  CUSTOMER_SUPPORT_RIGHTS = CUSTOMER_SUPPORT_RIGHTS;
  constructor(
    private _fb: FormBuilder,
    private _service: CustomerCareService,
    private utils: utils,
    private drawerService: DrawerService,
    public dialog: MatDialog,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.ctcForm = this._fb.group({
      careContent: ['', [Validators.required]],
      partnerName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllPartner();
  }

  viewListOrder() {
    const dialogRef = this.dialog.open(CustomerListOrderComponent);
    dialogRef.componentInstance.partnerCode = this.partnerCode;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let date = moment(result.createDate).format('DD-MM-YYYY');
        this.showOrderCode = true;
        this.codeOrder = result.code;
        this.dateOrder = result.createDate;
        this.itemOrder = result.itemName;
        this.phoneOrder = result.phoneNumber;
        this.statusOrder = this.state_order[result?.state]?.name;
      }
    });
  }

  onChangePartner(event: any) {
    // this.listPartnerFilter = this.listPartnerAll.filter((item: any) => {
    //   return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    // });
    if (event.partnerCode != this.partnerCode) {
      this.codeOrder = '';
    }
    this.partnerCode = event.code;
    this.partnerName = event.name;
    this.phoneOrder = event.phoneNumber;
  }

  // selectPartner(item: any, event: any) {
  //   if (item.partnerCode != this.partnerCode) {
  //     this.codeOrder = '';
  //   }
  //   this.partnerCode = item.code;
  //   this.partnerName = item.name;
  //   this.phoneOrder = item.phoneNumber;
  // }

  GetAllPartner() {
    this.dropdownService.GetAllPartner({IsCustomer: true, IsActive: true}).subscribe(
      ({data}) => {
        this.listPartnerAll = data;
        // this.listPartnerFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  get f() {
    return this.ctcForm.controls;
  }

  close() {
    this.drawerService.close();
  }
  // handleAutocompleteData() {
  //   const partner = this.listPartnerAll.find((item: any) => item.name == this.ctcForm.value.partnerName);
  //   if (!partner || partner?.name !== this.ctcForm.value.partnerName) {
  //     this.listPartnerFilter = this.listPartnerAll;
  //   }
  // }
  onCreate() {
    // this.handleAutocompleteData();
    this.submitted = true;
    if (this.ctcForm.invalid) {
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
    if (this.codeOrder) {
      let currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
      this._service
        .Insert(
          {
            orderCode: this.codeOrder,
            partnerCode: this.partnerCode,
            careDate: currentDateTime,
            careContent: this.ctcForm.value.careContent.trim(),
          }
        )
        .subscribe(
          (data) => {
            this.drawerService.returnData(data);
            this.submitted = false;
            this.ctcForm?.get('careContent')?.setValue('');
          },
          (error) => {
            console.log('error: ', error);
          },
        );
    } else {
      let currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
      this._service
        .Insert(
          {
            partnerCode: this.partnerCode,
            careDate: currentDateTime,
            careContent: this.ctcForm.value.careContent.trim(),
          },
        )
        .subscribe(
          (data) => {
            this.drawerService.returnData(data);
            this.submitted = false;
            this.ctcForm?.get('careContent')?.setValue('');
          },
          (error) => {
            console.log('error: ', error);
          },
        );
    }
  }
}
