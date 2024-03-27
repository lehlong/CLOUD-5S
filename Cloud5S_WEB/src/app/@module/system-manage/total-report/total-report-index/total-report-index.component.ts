import {Component} from '@angular/core';
import {ReportStockImportService} from 'src/app/services/Report/report-stock-import.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {TotalReportFilter} from 'src/app/@filter/SO/total-report.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-total-report-index',
  templateUrl: './total-report-index.component.html',
  styleUrls: ['./total-report-index.component.scss'],
})
export class TotalReportIndexComponent {
  listPartnerAll: any = [];
  listItemAll: any = [];
  faFileExcel = faFileExcel;

  listItemTypeAll: any = [];
  listItemTypeFilter: any = [];

  listPartnerFilter: any = [];
  listItemFilter: any = [];

  selectedStates: any = [];

  listStockAll: any = [];
  listStockFilter: any = [];

  paginationResult!: PaginationResult;

  filter = new TotalReportFilter();
  state_order = STATE_ORDER;
  list_state = LIST_STATE;
  partnerSelected = {
    code: '',
    name: '',
  };
  StockSelected = {
    code: '',
    name: '',
  };
  ItemTypeSelected = {
    code: '',
    name: '',
  };

  itemSelected = {
    code: '',
    name: '',
  };

  constructor(
    private _service: ReportStockImportService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
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

  onChangeItemType(event: any) {
    this.listItemTypeFilter = this.listItemTypeAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  selectItemType(item: any, event: any) {
    if (event.isUserInput) {
      this.ItemTypeSelected.code = item.code;
      this.ItemTypeSelected.name = item.name;
    }
  }

  GetAllItemType() {
    this.dropdownService.GetAllItemType().subscribe(
      ({data}) => {
        this.listItemTypeAll = data;
        this.listItemTypeFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onChangeStock(event: any) {
    this.listStockFilter = this.listStockAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  selectStock(item: any, event: any) {
    if (event.isUserInput) {
      this.StockSelected.code = item.code;
      this.StockSelected.name = item.name;
    }
  }

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStockAll = data;
        this.listStockFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  onChangePartner(event: any) {
    this.listPartnerFilter = this.listPartnerAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  onChangeItem(event: any) {
    this.listItemFilter = this.listItemAll.filter((item: any) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }

  selectPartner(item: any, event: any) {
    if (event.isUserInput) {
      this.partnerSelected.code = item.code;
      this.partnerSelected.name = item.name;
    }
  }

  selectItem(item: any, event: any) {
    if (event.isUserInput) {
      this.itemSelected.name = item.name;
      this.itemSelected.code = item.code;
    }
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
        this.listPartnerFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
        this.listItemFilter = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  handleAutocomplete(first: boolean = false) {
    if (first) {
      setTimeout(() => {
        this.partnerSelected.code = this.filter.PartnerCode;
        const partnerData = this.listPartnerAll.find((item: any) => {
          return item.code == this.filter.PartnerCode;
        });
        this.partnerSelected.name = partnerData?.name || '';

        this.itemSelected.code = this.filter.itemCode;
        const itemData = this.listItemAll.find((item: any) => {
          return item.code == this.filter.itemCode;
        });
        this.itemSelected.name = itemData?.name || '';
      }, 200);
    } else {
      const partnerData = this.listPartnerAll.find((item: any) => {
        return item.name === this.partnerSelected.name;
      });
      if (partnerData) {
        this.filter.PartnerCode = this.partnerSelected.code;
      } else {
        this.filter.PartnerCode = '';
        this.partnerSelected.name = '';
        this.partnerSelected.code = '';
        this.listPartnerAll = this.listPartnerAll.map((item: any) => {
          return {
            ...item,
            selected: false,
          };
        });
        this.listPartnerFilter = this.listPartnerAll;
      }

      const itemData = this.listItemAll.find((item: any) => {
        return item.name === this.itemSelected.name;
      });
      if (itemData) {
        this.filter.itemCode = this.itemSelected.code;
      } else {
        this.filter.itemCode = '';
        this.itemSelected.name = '';
        this.itemSelected.code = '';
        this.listItemAll = this.listItemAll.map((item: any) => {
          return {
            ...item,
            selected: false,
          };
        });
        this.listItemFilter = this.listItemAll;
      }
    }
  }

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'phieu-can-hang.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  search(first: boolean = false) {
    this.handleAutocomplete(first);
    if (this.selectedStates?.length > 0) {
      this.filter = {
        ...this.filter,
      };
    }

    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;

        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: TotalReportFilter) => item.code == this.filter.code);
          if (detail && first) {
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetAllItem();
    this.GetAllStock();
    this.search(first);
    this.GetAllItemType();
  }

  reload() {
    this.selectedStates = [];
    this.filter = new TotalReportFilter();
    this.search(true);
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
