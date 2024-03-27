import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {exportDataWood} from 'src/app/@filter/Business/production-manager.filter';
import {ProductionManagerService} from 'src/app/services/Business/production-manager.service';
@Component({
  selector: 'app-data-stock-wood',
  templateUrl: './data-stock-wood.component.html',
  styleUrls: ['./data-stock-wood.component.scss'],
})
export class DataStockWoodComponent {
  @Input() tab: number = 4;
  filter = new exportDataWood();
  constructor(private _service: ProductionManagerService) {}

  exportExcel() {
    const filterFormat = {
      date: this.filter?.date ? moment(this.filter?.date)?.format('YYYY-MM-DD') : null,
    };
    return this._service.ExportDataManufacture(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-nhap-xuat' + filterFormat?.date + '.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}
