import {Component, Inject} from '@angular/core';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderBerthFilter} from 'src/app/@filter/SO/export.filter';
import {OrderService} from 'src/app/services/SO/order.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {utils} from 'src/app/utils/utils';
import * as moment from 'moment';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {ORDER_SELL_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-update-ship',
  templateUrl: './update-ship.component.html',
  styleUrls: ['./update-ship.component.scss'],
})
export class UpdateShipComponent {
  paginationResult!: PaginationResult;
  filter = new OrderBerthFilter();
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;
  shipForm: FormGroup;

  listPartnerAll: any = [];
  listShip: any = [];
  listBerth: any = [];
  submitted: boolean = false;
  ORDER_SELL_RIGHTS = ORDER_SELL_RIGHTS;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateShipComponent>,
    private _service: OrderService,
    private dropdownService: DropdownService,
    private drawerService: DrawerService,
    public utils: utils,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
    this.shipForm = this._fb.group({
      berthCode: ['', [Validators.required]],
      cargoCompartmentNumber: ['', [Validators.required]],
      // shipCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  get f() {
    return this.shipForm.controls;
  }

  onSave() {
    this.submitted = true;
    if (this.shipForm.invalid) {
      return;
    }
    let objectInsert = {
      ...this.shipForm.value,
      cargoCompartmentNumber: parseInt(this.shipForm.value.cargoCompartmentNumber),
      code: this.data.code,
    };

    this._service.UpdateBerth(objectInsert).subscribe(
      (data) => {
        this.submitted = false;
        this.dialogRef.close(data);
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  reload() {
    this.filter = new OrderBerthFilter();
  }

  loadInit() {
    this.GetAllPartner();
    this.GetShip();
    this.GetBerth();
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetShip() {
    this.dropdownService.GetAllShip().subscribe(
      ({data}) => {
        this.listShip = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetBerth() {
    this.dropdownService.GetAllBerth().subscribe(
      ({data}) => {
        this.listBerth = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
