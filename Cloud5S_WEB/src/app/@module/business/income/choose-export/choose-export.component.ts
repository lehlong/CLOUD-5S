import {Component} from '@angular/core';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderExportFilter} from 'src/app/@filter/SO/export.filter';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import {MatDialogRef} from '@angular/material/dialog';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {utils} from 'src/app/utils/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-choose-export',
  templateUrl: './choose-export.component.html',
  styleUrls: ['./choose-export.component.scss'],
})
export class ChooseExportIncomeComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  displayedColumns: string[] = [
    'choose',
    'index',
    'code',
    'exportDate',
    'partner',
    'sumMoney',
    'debt',
    'referenceCheck',
  ];
  paginationResult!: PaginationResult;
  filter = new OrderExportFilter();
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;

  listStockAll: any = [];
  listPartnerAll: any = [];

  listSelect: any = [];
  isCheckAllChecked: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ChooseExportIncomeComponent>,
    private _service: OrderExportService,
    private dropdownService: DropdownService,
    public utils: utils,
  ) {}

  ngOnInit(): void {
    this.loadInit();
  }

  onSave() {
    this.dialogRef.close(this.listSelect);
    this.listSelect = [];
  }

  reload() {
    this.filter = new OrderExportFilter();
    this.search();
  }

  checkSelect(code: string) {
    return this.listSelect.some((item: any) => item.code == code);
  }

  selectItem(e: any, item: any) {
    if (e.checked) {
      this.listSelect = [...this.listSelect, item];
    } else {
      this.listSelect = this.listSelect.filter((selectItem: any) => {
        return selectItem?.code != item.code;
      });
    }
  }

  toggleCheckAll(event: Event) {
    this.isCheckAllChecked = !this.isCheckAllChecked;
    // Chuyển đổi trạng thái của tất cả các checkbox khác dựa trên giá trị "isCheckAllChecked"
    if (this.isCheckAllChecked) {
      // Nếu "Check All" được chọn, thêm tất cả các mục vào danh sách đã chọn
      this.listSelect = [...this.paginationResult.data];
    } else {
      // Nếu "Check All" không được chọn, xóa danh sách đã chọn
      this.listSelect = [];
    }
  }

  loadInit() {
    this.GetAllPartner();
    this.search();
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

  search() {
    this._service
      .search({
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
        PartnerCode: this.filter.PartnerCode,
      })
      .subscribe({
        next: ({data}) => {
          this.paginationResult = data;
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
}
