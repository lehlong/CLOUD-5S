import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderExportFilterRequest} from 'src/app/@filter/SO/export.filter';
import {OrderExportCreateModel, OrderExportUpdateModel} from 'src/app/models/SO/order-export.model';
import {ExportTableFilter} from 'src/app/@filter/SO/export-table.filter';

@Injectable({
  providedIn: 'root',
})
export class OrderExportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: OrderExportFilterRequest) {
    return this._commonService.getRequest(`OrderExport/Search`, pagination);
  }

  GetDetail(code: string) {
    return this._commonService.getRequest(`OrderExport/GetDetail?code=${code}`);
  }

  ExportExcel(pagination?: OrderExportFilterRequest) {
    return this._commonService.getFileRequest(`OrderExport/Export`, pagination);
  }

  Insert(parameters: OrderExportCreateModel) {
    return this._commonService.postRequest(`OrderExport/Insert`, parameters);
  }

  Update(parameters: OrderExportUpdateModel) {
    return this._commonService.putRequest(`OrderExport/Update`, parameters);
  }

  Confirm(code: string) {
    return this._commonService.putRequest(`OrderExport/ConfirmState`, {code: code});
  }

  Cancel(code: string) {
    return this._commonService.putRequest(`OrderExport/CancelState`, {code: code});
  }
  GetExportByDay(filter: ExportTableFilter) {
    return this._commonService.getRequest(`OrderExport/ExportByDay`, filter);
  }

  ExportByDayExcel(pagination?: ExportTableFilter) {
    return this._commonService.getFileRequest(`OrderExport/ExportByDayExcel`, pagination);
  }
}
