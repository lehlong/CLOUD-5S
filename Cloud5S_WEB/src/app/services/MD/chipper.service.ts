import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ChipperModel} from 'src/app/models/MD/chipper.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class ChipperService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Chipper/Search`, pagination);
  }

  Insert(parameters?: ChipperModel) {
    return this._commonService.postRequest(`Chipper/Insert`, parameters);
  }

  Update(parameters?: ChipperModel) {
    return this._commonService.putRequest(`Chipper/Update`, parameters);
  }
  Delete(parameters?: ChipperModel) {
    return this._commonService.deleteRequest(`Chipper/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: ChipperModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Chipper/Export`, pagination);
  }
}
