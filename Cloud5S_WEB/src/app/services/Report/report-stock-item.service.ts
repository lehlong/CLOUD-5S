import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ReportStockItemFilter} from 'src/app/@filter/Report/report-stock-item.filter';

@Injectable({
  providedIn: 'root',
})
export class ReportStockItemService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: ReportStockItemFilter) {
    return this._commonService.getRequest(`StockItem/Search`, pagination);
  }
}
