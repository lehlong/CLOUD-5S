import {Component, OnInit} from '@angular/core';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ItemFilter} from 'src/app/@filter/MD/item.filter';
import {VehicleService} from 'src/app/services/MD/vehicle.service';
import {ItemModel} from 'src/app/models/MD/item.model';
import {DebounceService} from 'src/app/services/Common/debounce.service';
import {MatDialogRef} from '@angular/material/dialog';
import {STOCK_IMPORT_RIGHTS} from 'src/app/utils/constant/access-right';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-choose-vehicle',
  templateUrl: './choose-vehicle.component.html',
  styleUrls: ['./choose-vehicle.component.scss'],
})
export class ChooseVehicleComponent implements OnInit {
  displayedColumns: string[] = ['choose', 'index', 'code', 'unladenWeight', 'dvt'];
  paginationResult!: PaginationResult;
  filter = new ItemFilter();
  listItemType: any = [];
  selectedTypeCode: string = '';
  listSelect: any = [];
  STOCK_IMPORT_RIGHTS = STOCK_IMPORT_RIGHTS;
  isCheckAllChecked: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ChooseVehicleComponent>,
    public utils: utils,
    private debounceService: DebounceService,
    private _service: VehicleService,
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
      'seachVehicle',
      () => {
        this.filter.keyWord = e?.target?.value || '';
        this.search();
      },
      400,
    );
  }

  checkSelect(code: string) {
    return this.listSelect.some((item: any) => item.vehicleCode == code);
  }

  selectItem(e: any, item: any) {
    if (e.checked) {
      let newItem = {
        vehicleCode: item.code,
        unladenWeight: item.unladenWeight,
        unitName: item?.unit?.name,
      };
      this.listSelect = [...this.listSelect, newItem];
      this.listSelect = this.listSelect.map((i: any) => {
        return {
          vehicleCode: i.code || i.vehicleCode,
          unladenWeight: i.unladenWeight,
          unitName: i?.unit?.name || i.unitName,
        };
      });
    } else {
      this.listSelect = this.listSelect.filter((selectItem: any) => {
        return selectItem?.vehicleCode != item.code;
      });
    }
  }
  toggleCheckAll(event: Event) {
    this.isCheckAllChecked = !this.isCheckAllChecked;
    // Chuyển đổi trạng thái của tất cả các checkbox khác dựa trên giá trị "isCheckAllChecked"
    if (this.isCheckAllChecked) {
      // Nếu "Check All" được chọn, thêm tất cả các mục vào danh sách đã chọn
      this.listSelect = this.paginationResult.data.map((item: any) => {
        return {
          vehicleCode: item.code,
          unladenWeight: item.unladenWeight,
          unitName: item?.unit?.name,
        };
      });
    } else {
      // Nếu "Check All" không được chọn, xóa danh sách đã chọn
      this.listSelect = [];
    }
  }

  selectTypeCode() {
    setTimeout(() => {
      this.search();
    }, 100);
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
        };
        // console.log('this.listSelect search', this.listSelect);

        // if (this.listSelect.length) {
        //   this.listSelect = [
        //     ...this.listSelect,
        //     data.data.reduce((result: any, element: any) => {
        //       if (this.listSelect.some((item: any) => item.code == element.code)) {
        //         return result;
        //       }
        //       return [...result, element];
        //     }, []),
        //   ];
        // }
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
