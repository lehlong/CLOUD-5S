import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {RfidModel} from 'src/app/models/MD/rfid.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class RfidService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Rfid/Search`, pagination);
  }

  Insert(parameters?: RfidModel) {
    return this._commonService.postRequest(`Rfid/Insert`, parameters);
  }

  Update(parameters?: RfidModel) {
    return this._commonService.putRequest(`Rfid/Update`, parameters);
  }
  Delete(parameters?: RfidModel) {
    return this._commonService.deleteRequest(`Rfid/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: RfidModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Rfid/Export`, pagination);
  }
}
