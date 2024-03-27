import {Component, Input} from '@angular/core';
import {STATE_ORDER} from 'src/app/utils/constant/index';
import {OrderFilter, OrderCustomeFilter} from 'src/app/@filter/SO/order.filter';
import {OrderModel, orderDetails} from 'src/app/models/SO/order.model';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderService} from 'src/app/services/SO/order.service';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-customer-list-order',
  templateUrl: './customer-list-order.component.html',
  styleUrls: ['./customer-list-order.component.scss'],
})
export class CustomerListOrderComponent {
  constructor(
    private _orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CustomerListOrderComponent>,
  ) {}

  @Input() partnerCode: any = [];
  filter = new OrderCustomeFilter();
  paginationResult: any = [];
  displayedColumns: string[] = ['index', 'code', 'createDate', 'itemName', 'phoneNumber', 'state'];
  state_order = STATE_ORDER;
  partnerName: string = '';
  ngOnInit(): void {
    this.search();
  }

  search(first: boolean = false) {
    this._orderService.search({...this.filter, PartnerCode: this.partnerCode}).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
        };
        this.partnerName = this.paginationResult.data[0]?.partnerName;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.currentPage = 1;
    this.filter.pageSize = pageSize;
    this.search();
  }
  chooseOrder(element: any) {
    this.dialogRef.close(element);
  }
  reload() {}
}
