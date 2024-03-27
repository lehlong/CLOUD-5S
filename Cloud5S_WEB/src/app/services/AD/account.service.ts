import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {
  AdAccount,
  AdAccountCreate,
  AdAccountModel,
  AdAccountUpdateInfor,
  AdChangePassword,
} from 'src/app/models/AD/account.model';
import {AccountFilter} from 'src/app/@filter/Common/account.filter';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: AccountFilter) {
    return this._commonService.getRequest(`Account/Search`, pagination);
  }

  Insert(parameters?: AdAccountCreate) {
    return this._commonService.postRequest(`Account/Insert`, parameters);
  }

  GetRight(parameters?: string) {
    return this._commonService.getRequest(`Account/GetRight?userName=${parameters}`);
  }

  Update(parameters?: AdAccountCreate) {
    return this._commonService.putRequest(`Account/Update`, parameters);
  }

  getRightOfUser(pagination: any) {
    return this._commonService.getRequest(`Right/getRightOfUser`, pagination);
  }

  Delete(parameters?: AdAccount) {
    return this._commonService.deleteRequest(`Account/Delete`, parameters);
  }
  UpdateInformation(parameters?: AdAccountUpdateInfor) {
    return this._commonService.putRequest(`Account/UpdateInformation`, parameters);
  }
  getDetail(parameters?: string) {
    return this._commonService.getRequest(`Account/GetDetail?userName=${parameters}`);
  }
  changePassWord(parameters?: AdChangePassword) {
    return this._commonService.putRequest(`Auth/ChangePassword`, parameters);
  }

  ExportExcel(pagination?: AdAccountModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`Account/Export`, pagination);
  }
}
