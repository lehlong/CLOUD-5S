import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {StockItemFilter} from 'src/app/@filter/Business/stock-item.filter';

@Injectable({
  providedIn: 'root',
})
export class StockItemService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: StockItemFilter) {
    return this._commonService.getRequest(`StockItem/Search`, pagination);
  }

  ExportExcel(pagination?: StockItemFilter, isLoading?: boolean) {
    return this._commonService.getFileRequest(`StockItem/Export`, pagination);
  }
}
