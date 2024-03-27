import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

@Injectable({
  providedIn: 'root',
})
export class InOutImageService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter) {
    return this._commonService.getRequest(`CheckInOutImage/Search`, pagination);
  }
}
