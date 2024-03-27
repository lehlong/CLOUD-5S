import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {BankAccountModel} from 'src/app/models/MD/bank-account.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`BankAccount/Search`, pagination);
  }

  Insert(parameters?: BankAccountModel, isLoading?: boolean) {
    return this._commonService.postRequest(`BankAccount/Insert`, parameters);
  }

  Update(parameters?: BankAccountModel, isLoading?: boolean) {
    return this._commonService.putRequest(`BankAccount/Update`, parameters);
  }

  Delete(parameters?: BankAccountModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`BankAccount/Delete/${parameters?.id}`, parameters);
  }

  ExportExcel(pagination?: BankAccountModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`BankAccount/Export`, pagination);
  }
}
