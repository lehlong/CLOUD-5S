import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {StockExportFilterRequest} from 'src/app/@filter/Business/stock-export.filter';
import {StockExportDetail} from 'src/app/models/Business/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockExportService {
  constructor(private _commonService: CommonService) {}
 
  search(pagination?: StockExportFilterRequest) {
    return this._commonService.getRequest(`StockExport/Search`, pagination);
  }
  GetDetail(pagination?: StockExportDetail) {
    return this._commonService.getRequest(`StockExport/GetDetail`, pagination);
  }
  ExportExcel(pagination?: StockExportFilterRequest) {
    return this._commonService.getFileRequest(`StockExport/Export`, pagination);
  }
}
