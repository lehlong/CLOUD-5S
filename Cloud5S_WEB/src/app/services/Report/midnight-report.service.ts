import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {MidnightReportFilterRequest, makeNewFilterRequest} from 'src/app/@filter/Report/midnight-report.filter';

@Injectable({
  providedIn: 'root',
})
export class MidnightReportService {
  constructor(private _commonService: CommonService) {}
  export0H(pagination?: MidnightReportFilterRequest) {
    return this._commonService.getRequest(`StockItem/Export0H`, pagination);
  }
  makeNewStockItemDetail(pagination?: makeNewFilterRequest) {
    return this._commonService.getRequest(`StockItemHistory/Synthetic`, pagination);
  }

  downloadExport(pagination?: MidnightReportFilterRequest) {
    return this._commonService.getFileRequest(`StockItem/DownloadExport`, pagination);
  }
}
