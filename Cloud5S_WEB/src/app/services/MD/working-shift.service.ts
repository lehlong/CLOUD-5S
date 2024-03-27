import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {WorkingShiftModel} from 'src/app/models/MD/working-shift.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class WorkingShiftService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`WorkingShift/Search`, pagination);
  }

  Insert(parameters?: WorkingShiftModel) {
    return this._commonService.postRequest(`WorkingShift/Insert`, parameters);
  }

  Update(parameters?: WorkingShiftModel) {
    return this._commonService.putRequest(`WorkingShift/Update`, parameters);
  }
  Delete(parameters?: WorkingShiftModel) {
    return this._commonService.deleteRequest(`WorkingShift/Delete/${parameters?.code}`, parameters);
  }

  ExportExcel(pagination?: WorkingShiftModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`WorkingShift/Export`, pagination);
  }
}
