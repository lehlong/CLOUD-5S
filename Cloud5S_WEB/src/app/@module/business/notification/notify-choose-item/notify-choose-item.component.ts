import {Component, OnInit} from '@angular/core';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ItemNotifyFilter} from 'src/app/@filter/MD/item.filter';
import {ItemService} from 'src/app/services/MD/item.service';
import {ItemModel} from 'src/app/models/MD/item.model';
import {DebounceService} from 'src/app/services/Common/debounce.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NotifyService} from 'src/app/services/Business/notify.service';
import {NOTIFY_RIGHTS} from 'src/app/utils/constant/access-right';
@Component({
  selector: 'app-notify-choose-item',
  templateUrl: './notify-choose-item.component.html',
  styleUrls: ['./notify-choose-item.component.scss'],
})
export class NotifyChooseItemComponent {
  displayedColumns: string[] = ['choose', 'index', 'itemTypeName', 'code', 'name', 'phoneNumber', 'email'];
  paginationResult!: PaginationResult;
  filter = new ItemNotifyFilter();
  listItemType: any = [];
  listSelect: any = [];
  NOTIFY_RIGHTS = NOTIFY_RIGHTS;
  isCheckAllChecked: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<NotifyChooseItemComponent>,
    private debounceService: DebounceService,
    private _service: ItemService,
    private notifyService: NotifyService,
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
        this.filter.keyWord = e.target?.value;
        this.search();
      },
      400,
    );
  }

  checkSelect(userName: string) {
    return this.listSelect.some((item: any) => item.userName == userName);
  }

  selectItem(e: any, item: any) {
    if (e.checked) {
      this.listSelect = [...this.listSelect, item];
    } else {
      this.listSelect = this.listSelect.filter((selectItem: any) => {
        return selectItem?.userName != item.userName;
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

  selectTypeCode(e: any) {
    this.filter.GroupId = e.target.value;
    this.search();
  }

  loadInit() {
    this.GetItemType();
    this.search();
  }

  search() {
    this.notifyService.search_2(this.filter).subscribe({
      next: ({data}) => {     
        this.paginationResult = {
          ...data,
          data: data.data.map((item: any) => {
            return {
              ...item,
              nameAccountGroup: item.accountGroup.name,
              userName: item?.userName,
              name: item?.fullName,
              phoneNumber: item?.phoneNumber,
              email: item?.email,
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
    this.dropdownService.GetAllAccountGroup().subscribe(
      ({data}) => {
        this.listItemType = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
