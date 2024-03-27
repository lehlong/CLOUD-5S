import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {MessageManagementModel} from 'src/app/models/System-manage/message-management.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Message/Search`, pagination);
  }

  Insert(parameters?: MessageManagementModel) {
    return this._commonService.postRequest(`Message/Insert`, parameters);
  }

  Update(parameters?: MessageManagementModel) {
    return this._commonService.putRequest(`Message/Update`, parameters);
  }
  Delete(parameters?: MessageManagementModel) {
    return this._commonService.deleteRequest(`Message/Delete/${parameters?.code}`, parameters);
  }
}
