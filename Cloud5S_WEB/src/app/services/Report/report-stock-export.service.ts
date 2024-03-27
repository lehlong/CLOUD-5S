import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ReportStockExportFilterRequest} from 'src/app/@filter/Report/report-stock-export.filter';

@Injectable({
  providedIn: 'root',
})
export class ReportStockExportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: ReportStockExportFilterRequest) {
    return this._commonService.getRequest(`StockExport/Search/Item`, pagination);
  }

  ExportExcel(pagination?: ReportStockExportFilterRequest) {
    return this._commonService.getFileRequest(`StockImport/Export`, pagination);
  }
}
