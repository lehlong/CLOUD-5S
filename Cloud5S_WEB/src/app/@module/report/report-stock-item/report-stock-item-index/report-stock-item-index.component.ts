import {Component, HostListener} from '@angular/core';
import {ReportStockItemService} from 'src/app/services/Report/report-stock-item.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ReportStockItemFilter} from 'src/app/@filter/Report/report-stock-item.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';

import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-report-stock-item-index',
  templateUrl: './report-stock-item-index.component.html',
  styleUrls: ['./report-stock-item-index.component.scss'],
})
export class ReportStockItemIndexComponent {
  listPartnerAll: any = [];
  listItemAll: any = [];
  listStockAll: any = [];
  listCompanyAll: any = [];
  faFileExcel = faFileExcel;
  listItemFilter: any = [];
  selectedStates: any = [];
  displayedColumns: string[] = ['index', 'companyCode', 'stockCode', 'itemCode', 'amount', 'unitCode'];

  listData: any = [];
  state_order = STATE_ORDER;
  list_state = LIST_STATE;

  filter = new ReportStockItemFilter();

  vehicleAll: any[] = [];

  constructor(
    private _service: ReportStockItemService,
    private dropdownService: DropdownService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo tồn kho gỗ dăm , gỗ nguyên liệu',
        path: 'report/report-stock-item',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      if (params?.States !== '') {
        this.selectedStates = this.list_state.filter((item: any) => {
          return params?.States?.includes(item.value);
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }
  userTypeFilter: any;
  selectItemType(userType: {value: string; label: string}, event: any) {}
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompanyAll = data;
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

  exportExcel() {
    // const filterFormat = {
    //   currentPage: this.filter.currentPage,
    //   pageSize: this.filter.pageSize,
    //   keyWord: this.filter.keyWord,
    //   ItemCode: this.filter.ItemCode,
    // };
    // return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
    //   const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    //   const url = window.URL.createObjectURL(blob);
    //   var anchor = document.createElement('a');
    //   anchor.download = 'bao-cao-tram-can.xlsx';
    //   anchor.href = url;
    //   anchor.click();
    // });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,

      ItemCode: this.filter.ItemCode,
      StockCode: this.filter.StockCode,
      UnitCode: this.filter.UnitCode,
      CompanyCode: this.filter.CompanyCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        console.log(data);
        this.listData = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllCompany();
    this.GetAllStock();
    this.GetAllItem();
    this.search(first);
  }

  reload() {
    this.filter = new ReportStockItemFilter();
    this.search();
  }
}
