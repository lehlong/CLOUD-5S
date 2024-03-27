import {Component, Input} from '@angular/core';
import {ProductionManagerService} from 'src/app/services/Business/production-manager.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ListStockItemTransferLogFilter} from 'src/app/@filter/Business/production-manager.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {
  STATE_LIST_PURCHASE_ORDERS,
  LIST_PURCHASE_ORDERS_STATE,
  PROCESS_TYPE,
  LIST_PROCESS_TYPE,
  PRODUCTION_MANAGER,
  STATE_SHIFT,
} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {DrawerService} from 'src/app/services/Common/drawer.service';
@Component({
  selector: 'app-list-stock-item-transfer-log',
  templateUrl: './list-stock-item-transfer-log.component.html',
  styleUrls: ['./list-stock-item-transfer-log.component.scss'],
})
export class ListStockItemTransferLogComponent {
  @Input() tab: number = 4;
  maxTagCount = 1;
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  submitted: boolean = false;

  STATE_LIST_PURCHASE_ORDERS = STATE_LIST_PURCHASE_ORDERS;
  LIST_PURCHASE_ORDERS_STATE = LIST_PURCHASE_ORDERS_STATE;
  LIST_PROCESS_TYPE = LIST_PROCESS_TYPE;
  PROCESS_TYPE = PROCESS_TYPE;
  PRODUCTION_MANAGER = PRODUCTION_MANAGER;
  STATE_SHIFT = STATE_SHIFT;

  listArea: any = [];
  listCompany: any = [];
  listItem: any = [];
  listStock: any = [];

  displayedColumns: string[] = [
    'index',
    'amount',
    'areaName',
    'createBy',
    'createDate',
    'fromSlot',
    'toSlot',
    'itemName',
    'stockName'
  ];
  paginationResult!: PaginationResult;
  filter = new ListStockItemTransferLogFilter();

  constructor(
    private _service: ProductionManagerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private drawerService: DrawerService,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      if (this.tab == 0) {
        this.filter = {
          ...this.filter,
          ...params,
        };
      }
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  GetAllArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listArea = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompany = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStock = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItem = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  reload() {
    this.filter = new ListStockItemTransferLogFilter();
    this.search();
  }
  search() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      fromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      toDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      areaCode: this.filter.areaCode,
      state: this.filter.state,
      companyCode: this.filter.companyCode,
      itemCode: this.filter.itemCode,
      stockCode: this.filter.stockCode,
    };
    this._service.getListStockItemTransferLog(filterFormat).subscribe({
      next: ({data}) => {
          this.paginationResult = {
            ...data,
            data: data?.data?.map((element: any) => {
              return {
                amount : element.amount ,
                areaName: element?.area?.name,
                createBy : element.createBy,
                createDate : element.createDate,
                fromPourLine : element?.fromPourLine?.name,
                toPourLine : element?.toPourLine?.name,
                fromPourSection : element?.fromPourSection?.name,
                toPourSection : element?.toPourSection?.name,
                itemName : element?.item?.name,
                stockName : element?.stock?.name
              }})
          }
      }
    });
  }

  loadInit() {
    this.GetAllArea();
    this.GetAllCompany();
    this.GetAllItem();
    this.GetAllStock();
    this.search();
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  changeFormatNum(str : string) {   
    const Result = str.match(/\d+/);
    if (Result) {
      return parseInt(Result[0], 10);
    } else {
      return str;
    }
  }

  pageSizeChange(pageSize: number) {
    this.filter.currentPage = 1;
    this.filter.pageSize = pageSize;
    this.search();
  }
}
