import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderImportFilterRequest} from 'src/app/@filter/Business/order-import.filter';
import {StockImportFilterRequest} from 'src/app/@filter/Business/stock-import.filter';
import {StockImportDetail} from 'src/app/models/Business/stock.model';
import {
  OrderImportModelInsert,
  OrderImportModelUpdate,
  ConfirmOrderImport,
  ConfirmOrderImportCancel,
} from 'src/app/models/Business/order-import.model';
@Injectable({
  providedIn: 'root',
})
export class OrderImportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: OrderImportFilterRequest) {
    return this._commonService.getRequest(`OrderImport/Search`, pagination);
  }

  ExportExcel(pagination?: StockImportFilterRequest) {
    return this._commonService.getFileRequest(`OrderImport/Export`, pagination);
  }

  GetDetail(pagination?: StockImportDetail) {
    return this._commonService.getRequest(`OrderImport/GetDetail`, pagination);
  }

  Insert(parameters?: OrderImportModelInsert) {
    return this._commonService.postRequest(`OrderImport/Insert`, parameters);
  }

  Update(parameters?: OrderImportModelUpdate) {
    return this._commonService.putRequest(`OrderImport/Update`, parameters);
  }

  Cancel(parameters: ConfirmOrderImportCancel) {
    return this._commonService.putRequest(`OrderImport/Cancelstate`, parameters);
  }

  ConfirmState(parameters?: ConfirmOrderImport) {
    return this._commonService.putRequest(`OrderImport/ConfirmState`, parameters);
  }
}
