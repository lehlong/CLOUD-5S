import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {InsertFilter, GetAllByReferenceFilter} from '../../@filter/Common/comment.filter';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _commonService: CommonService) {}

  getAllByReference(parameters: GetAllByReferenceFilter) {
    return this._commonService.getRequest(`Comment/GetAllByReference`, parameters);
  }

  getAll() {
    return this._commonService.getRequest(`Comment/GetAll`);
  }

  Insert(parameters?: InsertFilter) {
    return this._commonService.postRequest(`Comment/Insert`, parameters, false);
  }

  Delete(id?: string) {
    return this._commonService.deleteRequest(`Comment/Delete`, null, {Id: id});
  }
}
