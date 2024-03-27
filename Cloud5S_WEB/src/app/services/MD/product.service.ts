import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ProductFilter} from 'src/app/@filter/MD/product.filter';
import {ProductModel} from 'src/app/models/MD/product.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _commonService: CommonService) {}

  ExportExcel(pagination?: ProductFilter) {
    return this._commonService.getFileRequest(`Item/Export`, pagination);
  }

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Item/Search`, pagination);
  }

  Insert(parameters?: ProductModel) {
    return this._commonService.postRequest(`Item/Insert`, parameters);
  }

  Update(parameters?: ProductModel) {
    return this._commonService.putRequest(`Item/Update`, parameters);
  }

  Delete(parameters?: ProductModel) {
    return this._commonService.deleteRequest(`Item/Delete/${parameters?.code}`, parameters);
  }
}
