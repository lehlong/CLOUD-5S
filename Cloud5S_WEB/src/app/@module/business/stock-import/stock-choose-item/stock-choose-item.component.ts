import {Component, OnInit} from '@angular/core';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ItemFilter} from 'src/app/@filter/MD/item.filter';
import {ItemService} from 'src/app/services/MD/item.service';
import {ItemModel} from 'src/app/models/MD/item.model';
import {DebounceService} from 'src/app/services/Common/debounce.service';
import {MatDialogRef} from '@angular/material/dialog';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
@Component({
  selector: 'app-stock-choose-item',
  templateUrl: './stock-choose-item.component.html',
  styleUrls: ['./stock-choose-item.component.scss'],
})
export class StockChooseItemComponent implements OnInit {
  displayedColumns: string[] = ['choose', 'index', 'itemTypeName', 'code', 'name', 'unitName'];
  paginationResult!: PaginationResult;
  filter = new ItemFilter();
  listItemType: any = [];
  selectedTypeCode:string = '';
  listSelect: any = [];
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;
  isCheckAllChecked: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<StockChooseItemComponent>,
    private debounceService: DebounceService,
    private _service: ItemService,
    private dropdownService: DropdownService,
  ) {}

  ngOnInit(): void {
    this.loadInit();
  }

  onSave() {
    this.dialogRef.close(this.listSelect);
    this.listSelect = [];
  }

  enterKeyword(e: any) {
    this.debounceService.debounce(
      'seachStockGetItem',
      () => {
        this.filter.keyWord = e?.target?.value || '';
        this.search();
      },
      400,
    );
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

  selectTypeCode() {
    setTimeout(() => {
      this.search();
    }, 100)
  }

  loadInit() {
    this.GetItemType();
    this.search();
  }

  search() {
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data.data.map((item: ItemModel) => {
            return {
              ...item,
              itemTypeName: item?.itemType?.name,
              itemTypeCode: item?.itemType?.code,
              unitName: item?.unit?.name,
              unitCode: item?.unit?.code,
            };
          }),
        };
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

  GetItemType() {
    this.dropdownService.GetAllItemType().subscribe(
      ({data}) => {
        this.listItemType = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
