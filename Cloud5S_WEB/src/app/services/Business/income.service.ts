import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {IncomeFilterRequest, IncomeFilterDetail} from 'src/app/@filter/Business/income.filter';
import {IncomeModel} from 'src/app/models/Business/income.model';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: IncomeFilterRequest, isLoading?: boolean) {
    return this._commonService.getRequest(`IncomeBill/Search`, pagination);
  }

  Insert(parameters?: IncomeModel, isLoading?: boolean) {
    return this._commonService.postRequest(`IncomeBill/Insert`, parameters);
  }

  GetDetail(pagination?: IncomeFilterDetail) {
    return this._commonService.getRequest(`IncomeBill/GetDetail`, pagination);
  }

  Update(parameters?: IncomeModel) {
    return this._commonService.putRequest(`IncomeBill/Update`, parameters);
  }

  ConfirmState(parameters?: any) {
    return this._commonService.putRequest(`IncomeBill/ConfirmState`, parameters);
  }

  CancelState(parameters?: any) {
    return this._commonService.putRequest(`IncomeBill/CancelState`, parameters);
  }
}
