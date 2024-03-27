import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {MidnightReportFilterRequest, makeNewFilterRequest} from 'src/app/@filter/Report/midnight-report.filter';

@Injectable({
  providedIn: 'root',
})
export class ReportSevenHourService {
  constructor(private _commonService: CommonService) {}
  export7H(pagination?: MidnightReportFilterRequest) {
    return this._commonService.getRequest(`StockItem/Export7H`, pagination);
  }

  downloadExport(pagination?: MidnightReportFilterRequest) {
    return this._commonService.getFileRequest(`StockItem/DownloadExport7H`, pagination);
  }
  makeNewStockItemDetail(pagination?: makeNewFilterRequest) {
    return this._commonService.getRequest(`StockItemHistory/Synthetic`, pagination);
  }

}
