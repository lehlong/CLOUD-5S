import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {StockImportFilterRequest} from 'src/app/@filter/Business/stock-import.filter';
import {StockCancel, StockImportDetail, StockImportModel} from 'src/app/models/Business/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockImportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: StockImportFilterRequest) {
    return this._commonService.getRequest(`StockImport/Search`, pagination);
  }

  ExportExcel(pagination?: StockImportFilterRequest) {
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

  Cancel(parameters: StockCancel) {
    return this._commonService.putRequest(`StockImport/Cancelstate`, parameters);
  }
  ConfirmState(parameters?: StockImportModel) {
    return this._commonService.putRequest(`StockImport/ConfirmState`, parameters);
  }
}
