import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PlanFilterRequest} from 'src/app/@filter/SO/plan.filter';
import { Observable, of } from 'rxjs';
import {TranferObject} from 'src/app/models/Common/tranfer-object.model';
@Injectable({
  providedIn: 'root',
})
export class PlanManagementService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: PlanFilterRequest) {
    return this._commonService.getRequest(`Order/Search`, pagination);
  }

  ExportExcel(pagination?: PlanFilterRequest) {
    return this._commonService.getFileRequest(`Order/Export`, pagination);
  }
}
