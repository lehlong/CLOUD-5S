import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ReportStockImportFilterRequest} from 'src/app/@filter/Report/report-stock-import.filter';

@Injectable({
  providedIn: 'root',
})
export class ReportStockImportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: ReportStockImportFilterRequest) {
    return this._commonService.getRequest(`StockImport/SearchExport`, pagination);
  }

  ExportExcel(pagination?: ReportStockImportFilterRequest) {
    return this._commonService.getFileRequest(`StockImport/Export`, pagination);
  }
}
