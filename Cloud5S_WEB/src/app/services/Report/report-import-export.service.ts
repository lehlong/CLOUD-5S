import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ReportImportExportFilterRequest} from 'src/app/@filter/Report/report-import-export.filter';

@Injectable({
  providedIn: 'root',
})
export class ReportImportExportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: ReportImportExportFilterRequest) {
    return this._commonService.getRequest(`StockItemHistory/Search`, pagination);
  }

  ExportExcel(pagination?: ReportImportExportFilterRequest) {
    return this._commonService.getFileRequest(`StockItemHistory/Export`, pagination);
  }
}
