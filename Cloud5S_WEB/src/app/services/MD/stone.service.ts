import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitFilter} from 'src/app/@filter/MD/unit.filter';
import {StoneModel} from 'src/app/models/MD/stone.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class StoneService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`Stone/Search`, pagination);
  }

  Insert(parameters?: StoneModel) {
    return this._commonService.postRequest(`Stone/Insert`, parameters);
  }

  Update(parameters?: StoneModel) {
    return this._commonService.putRequest(`Stone/Update`, parameters);
  }

  Delete(parameters?: StoneModel) {
    return this._commonService.deleteRequest(`Stone/Delete/${parameters?.code}`, parameters);
  }
}
