import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {StockImportFilter} from 'src/app/@filter/SO/stock-import.filter';
import {StockImportDetail, StockImportModel} from 'src/app/models/Business/stock.model';

@Injectable({
  providedIn: 'root',
})
export class TotalReportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: StockImportFilter) {
    return this._commonService.getRequest(`StockImport/Search`, pagination);
  }

  ExportExcel(pagination?: StockImportFilter) {
    return this._commonService.getFileRequest(`StockImport/Export`, pagination);
  }

  GetDetail(pagination?: StockImportDetail) {
    return this._commonService.getRequest(`StockImport/GetDetail`, pagination);
  }

  Insert(parameters?: StockImportModel) {
    return this._commonService.postRequest(`StockImport/Insert`, parameters);
  }

  Update(parameters?: StockImportModel) {
    return this._commonService.putRequest(`StockImport/Update`, parameters);
  }

  ConfirmState(parameters?: StockImportModel) {
    return this._commonService.putRequest(`StockImport/ConfirmState`, parameters);
  }
}
