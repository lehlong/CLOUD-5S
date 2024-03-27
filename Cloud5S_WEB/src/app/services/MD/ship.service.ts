import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ShipModel} from 'src/app/models/MD/ship.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Ship/Search`, pagination);
  }

  Insert(parameters?: ShipModel) {
    return this._commonService.postRequest(`Ship/Insert`, parameters);
  }

  Update(parameters?: ShipModel) {
    return this._commonService.putRequest(`Ship/Update`, parameters);
  }
  Delete(parameters?: ShipModel) {
    return this._commonService.deleteRequest(`Ship/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: ShipModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Ship/Export`, pagination);
  }
}
