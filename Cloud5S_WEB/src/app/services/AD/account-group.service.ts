import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {AccountGroupModel} from 'src/app/models/AD/account-group.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class AccountGroupService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`AccountGroup/Search`, pagination);
  }

  GetDetail(code?: string) {
    return this._commonService.getRequest(`AccountGroup/GetDetail?code=${code}`);
  }

  Insert(parameters?: AccountGroupModel) {
    return this._commonService.postRequest(`AccountGroup/Insert`, parameters);
  }

  Update(parameters?: AccountGroupModel) {
    return this._commonService.putRequest(`AccountGroup/Update`, parameters);
  }

  Delete(parameters?: AccountGroupModel) {
    return this._commonService.deleteRequest(`AccountGroup/Delete`, parameters);
  }

  ExportExcel(pagination?: AccountGroupModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`AccountGroup/Export`, pagination);
  }
}
