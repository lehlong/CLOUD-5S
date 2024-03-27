import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {DebtModel} from 'src/app/models/SO/debt.model';
import {DebtFilterRequest, DebtDetail} from 'src/app/@filter/SO/debt.filter';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: DebtFilterRequest) {
    return this._commonService.getRequest(`Order/Search`, pagination);
  }

  GetDetail(pagination?: DebtDetail) {
    return this._commonService.getRequest(`Order/DebtDetail`, pagination);
  }

  Insert(parameters?: DebtModel) {
    return this._commonService.postRequest(`Order/Insert`, parameters);
  }

  Update(parameters?: DebtModel) {
    return this._commonService.putRequest(`Order/Update`, parameters);
  }

  DebtCloseState(parameters?: DebtModel) {
    return this._commonService.putRequest(`Order/DebtCloseState`, parameters);
  }

  Delete(parameters?: DebtModel) {
    return this._commonService.deleteRequest(`Order/Delete`, parameters);
  }

  UpdateStep(parameters?: any) {
    return this._commonService.putRequest(`Order/UpdateStep`, parameters);
  }

  CompleteState(parameters?: any) {
    return this._commonService.putRequest(`Order/CompleteState`, parameters);
  }

  RejectState(parameters?: any) {
    return this._commonService.putRequest(`Order/RejectState`, parameters);
  }

  CancelState(parameters?: any) {
    return this._commonService.putRequest(`Order/CancelState`, parameters);
  }
}
