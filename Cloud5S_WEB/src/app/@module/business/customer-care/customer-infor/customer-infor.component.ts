import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from 'src/app/services/SO/customer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {CustomerFilter} from 'src/app/@filter/SO/customer.filter';
import {CustomerInforFilter} from 'src/app/@filter/MD/customer-infor.filter';
import {DebounceService} from 'src/app/services/Common/debounce.service';
@Component({
  selector: 'app-customer-infor',
  templateUrl: './customer-infor.component.html',
  styleUrls: ['./customer-infor.component.scss'],
})
export class CustomerInforComponent {
  @Output() partnerCodeChange = new EventEmitter<string>();

  constructor(private _service: CustomerService, private debounceService: DebounceService) {}
  dataSource!: any;
  //Khai báo biến
  displayedColumns: string[] = ['code', 'name'];
  paginationResult!: PaginationResult;
  filter = new CustomerFilter();
  onlyFilterCode = new CustomerInforFilter();
  //Khai báo hàm
  ngOnInit(): void {
    this.loadInit();
  }
  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
    };
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit() {
    this.search(this.filter.currentPage,100);
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
  ChooseCustomer(item: any) {
    this.partnerCodeChange.emit(item.code);
  }
  reload() {
    this.filter = new CustomerFilter();
    this.search();
  }
  enterKeyword(e: any) {
    this.debounceService.debounce(
      'searchCustomer',
      () => {
        this.filter.keyWord = e.target?.value;
        this.search();
      },
      400,
    );
  }
}
