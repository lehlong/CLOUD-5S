import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {BridgePortModel} from 'src/app/models/MD/bridge-port.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class BridgePortService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Berth/Search`, pagination);
  }

  Insert(parameters?: BridgePortModel) {
    return this._commonService.postRequest(`Berth/Insert`, parameters);
  }

  Update(parameters?: BridgePortModel) {
    return this._commonService.putRequest(`Berth/Update`, parameters);
  }
  Delete(parameters?: BridgePortModel) {
    return this._commonService.deleteRequest(`Berth/Delete/${parameters?.code}`, parameters);
  }
  ExportExcel(pagination?: BridgePortModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Berth/Export`, pagination);
  }
  getAll(isLoading?: boolean) {
    return this._commonService.getRequest(`Berth/GetAll`);
  }
}
