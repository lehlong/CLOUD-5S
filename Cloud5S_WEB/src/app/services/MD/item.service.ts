import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ItemModel} from 'src/app/models/MD/item.model';
import {ItemFilter} from 'src/app/@filter/MD/item.filter';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: ItemFilter) {
    return this._commonService.getRequest(`Item/Search`, pagination);
  }

  Insert(parameters?: ItemModel) {
    return this._commonService.postRequest(`Item/Insert`, parameters);
  }

  Update(parameters?: ItemModel) {
    return this._commonService.putRequest(`Item/Update`, parameters);
  }
}
