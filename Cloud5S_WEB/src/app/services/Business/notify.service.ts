import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {NotifyFilterRequest} from 'src/app/@filter/Business/notify.filter';
import {NotifyInsertModel} from 'src/app/models/Business/notify.model';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: NotifyFilterRequest) {
    return this._commonService.getRequest(`Notification/ManagerSearch`, pagination);
  }

  ExportExcel(pagination?: NotifyFilterRequest) {
    return this._commonService.getFileRequest(`StockImport/Export`, pagination);
  }
  Insert(parameters?: NotifyInsertModel) {
    return this._commonService.postRequest(`Notification/Insert`, parameters);
  }
  search_2(pagination?: any) {
    return this._commonService.getRequest(`Account/Search`, pagination);
  }
  
  GetDetail(id: string) {
    return this._commonService.getRequest(`Notification/ManagerGetById?Id=${id}`);
  }
}
