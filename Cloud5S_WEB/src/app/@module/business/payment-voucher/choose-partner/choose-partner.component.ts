import {Component} from '@angular/core';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {PartnerFilter} from 'src/app/@filter/MD/partner.filter';
import {PartnerService} from 'src/app/services/MD/partner.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-choose-partner',
  templateUrl: './choose-partner.component.html',
  styleUrls: ['./choose-partner.component.scss'],
})
export class ChoosePartnerComponent {
  displayedColumns: string[] = ['choose', 'code', 'name', 'taxCode', 'address', 'phoneNumber', 'email'];
  paginationResult!: PaginationResult;
  filter = new PartnerFilter();
  listItemType: any = [];
  listSelect: any = [];
  isCheckAllChecked: boolean = false;
  constructor(public dialogRef: MatDialogRef<ChoosePartnerComponent>, private _service: PartnerService) {}

  ngOnInit(): void {
    this.search();
  }

  selectPartner(code: string) {
    this.dialogRef.close(code);
  }

  reload() {
    this.filter = new PartnerFilter();
    this.search();
  }

  search() {
    this._service.search({...this.filter, isProvider: true}).subscribe({
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
