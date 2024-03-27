import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {CustomerCareService} from 'src/app/services/Business/customer-care.service';
import {FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CustomerCareFilter, CustomerCareEditFilter} from 'src/app/@filter/Business/customer-care.filter';
import {CUSTOMER_SUPPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer-care-edit',
  templateUrl: './customer-care-edit.component.html',
  styleUrls: ['./customer-care-edit.component.scss'],
})
export class CustomerCareEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';

  ctcForm: FormGroup;
  submitted: boolean = false;
  careDate: string = '';
  orderCode: string = '';
  careContent: string = '';
  dateCare: string = '';
  timeCare: string = '';
  listOrderAll: any = [];
  partnerCode: string = '';
  id: string = '';
  partnerName: string = '';
  address: string = '';
  phoneNumber: string = '';
  filter = new CustomerCareEditFilter();
  CUSTOMER_SUPPORT_RIGHTS = CUSTOMER_SUPPORT_RIGHTS;
  constructor(
    private _service: CustomerCareService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.ctcForm = this._fb.group({
      careContent: ['', [Validators.required]],
    });
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit();
    this.ctcForm?.get('careContent')?.setValue(this.careContent);
    this.getPartnerCode();
  }

  loadInit() {}

  get f() {
    return this.ctcForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      id: '',
      orderCode: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  getPartnerCode() {
    this.dropdownService.GetAllOrder().subscribe(
      ({data}) => {
        this.listOrderAll = data;
        const listFilterPartnerCode = this.listOrderAll.filter((item: any) => {
          return item.code === this.orderCode;
        });
        this.partnerCode = listFilterPartnerCode[0]?.partnerCode;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onEdit() {
    this.submitted = true;
    const dateTime = moment(
      `${moment(this.careDate).format('YYYY-MM-DD')} ${moment(this.careDate).format('HH:mm')}`,
      'YYYY-MM-DD HH:mm',
    );
    const careDate = dateTime.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
    this.getPartnerCode();
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
    this._service
      .Update(
        {
          id: this.id,
          orderCode: this.orderCode.trim(),
          careDate: careDate,
          careContent: this.ctcForm.value.careContent.trim(),
          partnerCode: this.partnerCode,
        },
        )
      .subscribe(
        (data) => {
          this.submitted = false;
          this.drawerService.returnData(data);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
