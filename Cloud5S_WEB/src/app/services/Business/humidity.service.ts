import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {HumidityFilterRequest, HumidityReportFilterRequest,ExportReportFilterRequest} from 'src/app/@filter/Business/humidity-evaluate';
import {Observable, of} from 'rxjs';
import {TranferObject} from 'src/app/models/Common/tranfer-object.model';
import {updateHumidity} from 'src/app/models/Business/humidity.model';

@Injectable({
  providedIn: 'root',
})
export class HumidityEvaluateService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: HumidityFilterRequest) {
    return this._commonService.getRequest(`Order/Search`, pagination);
  }
  searchReport(pagination?: HumidityReportFilterRequest) {
    return this._commonService.getRequest(`Order/ReportMoisture`, pagination);
  }

  getAll() {
    return this._commonService.getRequest(`Order/GetAll`);
  }

  ExportExcel(pagination?: ExportReportFilterRequest) {
    return this._commonService.getFileRequest(`Moisture/ExportReportMoistureExcel`, pagination);
  }

  ExportListExcel(pagination?: ExportReportFilterRequest) {
    return this._commonService.getFileRequest(`Moisture/Export`, pagination);
  }

  UpdateHumidity(parameters?: updateHumidity) {
    return this._commonService.putRequest(`Moisture/BatchUpdate`, parameters);
  }
}
