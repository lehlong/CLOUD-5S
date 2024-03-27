import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {orderScaleDetails} from 'src/app/models/MD/orders-cale.model';
import {OrderScaleFilterRequest} from 'src/app/@filter/SO/order-scale.filter';
import {OrderScaleIndexFilterRequest} from 'src/app/@filter/SO/order-scale-index.filter';

@Injectable({
  providedIn: 'root',
})
export class OrderScaleService {
  constructor(private _commonService: CommonService) {}

  ExportExcel(pagination?: OrderScaleFilterRequest) {
    return this._commonService.getFileRequest(`OrderScale/Export`, pagination);
  }
  ExportReportExcel(pagination?: OrderScaleFilterRequest) {
    return this._commonService.getFileRequest(`OrderScale/ExportReport`, pagination);
  }

  search(pagination?: OrderScaleIndexFilterRequest) {
    return this._commonService.getRequest(`OrderScale/Search`, pagination);
  }

  GetDetail(pagination?: orderScaleDetails) {
    return this._commonService.getRequest(`OrderScale/GetDetail`, pagination);
  }

  GeReport(filter?: OrderScaleFilterRequest) {
    return this._commonService.getRequest(`OrderScale/ReportOrderScale`, filter);
  }

  getByReferenceId(ReferenceId: string) {
    return this._commonService.getRequest(`ModuleAttachment/GetByReferenceId?ReferenceId=${ReferenceId}`);
  }
}
