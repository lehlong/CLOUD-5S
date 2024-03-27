import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ContractFilterRequest} from 'src/app/@filter/Business/contract.filter';
import {ContractModel, ContractDetail, ContractCancel} from 'src/app/models/Business/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: ContractFilterRequest) {
    return this._commonService.getRequest(`Contract/Search`, pagination);
  }

  ExportExcel(pagination?: ContractFilterRequest) {
    return this._commonService.getFileRequest(`Contract/Export`, pagination);
  }

  Insert(parameters?: ContractModel) {
    return this._commonService.postRequest(`Contract/Insert`, parameters);
  }

  GetDetail(pagination?: ContractDetail) {
    return this._commonService.getRequest(`Contract/GetDetail`, pagination);
  }

  Cancel(parameters: ContractCancel) {
    return this._commonService.putRequest(`Contract/Cancelstate`, parameters);
  }

  ConfirmState(parameters?: ContractModel) {
    return this._commonService.putRequest(`Contract/ConfirmState`, parameters);
  }

  Update(parameters?: ContractModel) {
    return this._commonService.putRequest(`Contract/Update`, parameters);
  }
}
