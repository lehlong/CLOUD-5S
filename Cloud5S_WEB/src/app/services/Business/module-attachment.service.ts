import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleAttachmentService {
  constructor(private _commonService: CommonService) {}

  GetByRefrenceId(id: string) {
    return this._commonService.getRequest(`ModuleAttachment/GetByReferenceId?ReferenceId=${id}`);
  }

  Upload(file?: any, params?: any) {
    return this._commonService.uploadRequest(`ModuleAttachment/Upload`, file, params);
  }
}
