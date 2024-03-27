import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  constructor(private _commonService: CommonService) {}

  Upload(file?: any, params?: any) {
    return this._commonService.uploadRequest(`Attachment/Upload`, file, params);
  }
}
