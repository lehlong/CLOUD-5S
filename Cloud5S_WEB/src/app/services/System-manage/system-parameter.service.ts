import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {MessageManagementModel} from 'src/app/models/System-manage/message-management.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {SystemParameterModel} from 'src/app/models/System-manage/system-parameter.model';
import {DropdownService} from '../Common/dropdown.service';

@Injectable({
  providedIn: 'root',
})
export class SystemParameterService {
  constructor(private _commonService: CommonService) {}

  detail() {
    return this._commonService.getRequest(`SystemParameter/GetDetail`);
  }

  Update(parameters?: SystemParameterModel) {
    return this._commonService.putRequest(`SystemParameter/Update`, parameters);
  }
}
// ông gọi cái DropdownService
