import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {METHOD} from 'src/app/utils/constant';
import {HandleResponse} from 'src/app/utils/utils';
import {CommonService} from '../Common/common.service';
@Injectable({
  providedIn: 'root',
})
export class FileManagementService {
  constructor(private http: HttpClient, private handleResponse: HandleResponse, private commonService: CommonService) {}
  downloadFile(url: string, params?: any) {
    return;
  }

  GetDetail(params?: any) {
    if (!params.ParentId) delete params.ParentId;
    return this.commonService.getRequest(`Folder/GetDetail`, params);
  }
  uploadFile(file: File, params: any) {
    return this.commonService.uploadRequest(`ModuleAttachment/Upload`, file, params);
  }
  uploadBatchFiles(files: FileList, params: any) {
    return this.commonService.uploadFilesRequest(`ModuleAttachment/BatchUpload`, files, params);
  }
  createFolder(folder: any) {
    return this.commonService.postRequest('Folder/Insert', folder);
  }
  updateFile(file: any, params?: any) {
    return this.commonService.putRequest('Attachment/Update', file);
  }
  updateFolder(folder: any, params?: any) {
    return this.commonService.putRequest('Folder/Update', folder);
  }
  getFile(ReferenceId: string) {
    return this.commonService.getRequest('ModuleAttachment/GetByReferenceId', {ReferenceId});
  }
  deleteFolder(id: string) {
    return this.commonService.deleteRequest(`Folder/Delete`, null, {id});
  }
  deleteFile(id: string) {
    return this.commonService.deleteRequest(`Attachment/Delete/${id}`);
  }
}
