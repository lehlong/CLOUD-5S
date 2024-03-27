import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {AttachmentFilter} from 'src/app/@filter/Business/attachment.filter';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: AttachmentFilter) {
    return this._commonService.getRequest(`Attachment/Search`, pagination);
  }

  GetByRefrenceId(id: string) {
    return this._commonService.getRequest(`Attachment/GetByReferenceId?ReferenceId=${id}`);
  }

  Upload(file?: any, params?: any) {
    return this._commonService.uploadRequest(`Attachment/Upload`, file, params);
  }

  Delete(id?: string) {
    return this._commonService.deleteRequest(`Attachment/Delete/${id}`, null);
  }

  GetDetail(id: string) {
    return this._commonService.getRequest(`Attachment/GetDetail?Id=${id}`);
  }

  Download(id: string) {
    return this._commonService.getFileRequest(`Attachment/Download?attachmentId=${id}`);
  }
}
