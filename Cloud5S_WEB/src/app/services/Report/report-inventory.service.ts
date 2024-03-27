import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ReportInventoryFilter} from 'src/app/@filter/Report/report-inventory.filter';

@Injectable({
  providedIn: 'root',
})
export class ReportInventoryService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: ReportInventoryFilter) {
    return this._commonService.getRequest(`StockItemDetail/GroupSearch`, pagination);
  }

  ExportExcel(pagination?: ReportInventoryFilter) {
    return this._commonService.getFileRequest(`StockItemDetail/Export`, pagination);
  }
}
