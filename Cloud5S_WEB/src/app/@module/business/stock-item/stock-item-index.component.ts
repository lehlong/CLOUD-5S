import {Component} from '@angular/core';
import {StockItemService} from 'src/app/services/Business/stock-item.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {StockItemFilter} from 'src/app/@filter/Business/stock-item.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {STOCK_ITEM_RIGHTS} from 'src/app/utils/constant/access-right';
import {GlobalService} from 'src/app/services/Common/global.service';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-stock-item-idnex',
  templateUrl: './stock-item-index.component.html',
  styleUrls: ['./stock-item-index.component.scss'],
})
export class StockItemIdnexComponent {
  listItemTypeAll: any = [];

  faFileExcel = faFileExcel;
  STOCK_ITEM_RIGHTS = STOCK_ITEM_RIGHTS;
  listStockAll: any = [];

  displayedColumns: string[] = ['index', 'stock', 'typeCode', 'code', 'name', 'amount', 'unitCode'];
  paginationResult!: PaginationResult;

  filter = new StockItemFilter();

  constructor(
    private _service: StockItemService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách tồn kho',
        path: 'business/stockitem',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }

  exportExcel() {
    return this._service.ExportExcel(this.filter).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-ton-kho.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  GetAllItemType() {
    this.dropdownService.GetAllItemType().subscribe(
      ({data}) => {
        this.listItemTypeAll = data;
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

  search(first: boolean = false, refresh: boolean = false, pageSize: number | undefined = undefined) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
    };
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;

        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: StockItemFilter) => item.code == this.filter.code);
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllStock();
    this.GetAllItemType();
    this.search(first);
  }

  reload() {
    this.filter = new StockItemFilter();
    this.search(true);
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search();
  }
}
