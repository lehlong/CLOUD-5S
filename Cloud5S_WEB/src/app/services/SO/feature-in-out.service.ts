import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {FeatureInOutFilterRequest} from 'src/app/@filter/SO/feature-in-out.filter';
import { Observable, of } from 'rxjs';
import {TranferObject} from 'src/app/models/Common/tranfer-object.model';
@Injectable({
  providedIn: 'root',
})
export class FeatureInOutService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: FeatureInOutFilterRequest) {
    return this._commonService.getRequest(`CheckInOut/Search`, pagination);
  }

  exportExcel(pagination?: FeatureInOutFilterRequest) {
    return this._commonService.getFileRequest(`CheckInOut/Export`, pagination);
  }

  getByReferenceId(ReferenceId: string) {
   return this._commonService.getRequest(`ModuleAttachment/GetByReferenceId?ReferenceId=${ReferenceId}`);
 }

}
