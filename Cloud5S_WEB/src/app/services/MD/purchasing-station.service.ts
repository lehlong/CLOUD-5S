import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PurchasingstationModel} from 'src/app/models/MD/Purchasingstation.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class PurchasingstationService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`PurchasingStation/Search`, pagination);
  }
  GetAll() {
    return this._commonService.getRequest(`PurchasingStation/GetAll`);
  }

  Insert(parameters?: PurchasingstationModel) {
    return this._commonService.postRequest(`PurchasingStation/Insert`, parameters);
  }

  Update(parameters?: PurchasingstationModel) {
    return this._commonService.putRequest(`PurchasingStation/Update`, parameters);
  }
  Delete(parameters?: PurchasingstationModel) {
    return this._commonService.deleteRequest(`PurchasingStation/Delete/${parameters?.code}`, parameters);
  }
  ExportExcel(pagination?: PurchasingstationModel, isLoading?: boolean) {
    return this._commonService.getFileRequest(`PurchasingStation/Export`, pagination);
  }
}
