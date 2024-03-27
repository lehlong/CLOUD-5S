import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {orderScaleDetails} from 'src/app/models/MD/orders-cale.model';
import {OrderScaleFilterRequest} from 'src/app/@filter/SO/order-scale.filter';

@Injectable({
  providedIn: 'root',
})
export class ReportOrderScaleService {
  constructor(private _commonService: CommonService) {}

  ExportExcel(pagination?: OrderScaleFilterRequest) {
    return this._commonService.getFileRequest(`OrderScale/ExportReportScale`, pagination);
  }

  search(pagination?: OrderScaleFilterRequest) {
    return this._commonService.getRequest(`OrderScale/ReportScale`, pagination);
  }
}
