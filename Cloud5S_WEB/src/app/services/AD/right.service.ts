import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {map} from 'rxjs';
import {TreeNode} from 'src/app/models/MD/tree-node.model';

@Injectable({
  providedIn: 'root',
})
export class RightService {
  constructor(private _commonService: CommonService) {}

  getDataForTree(userName: string) {
    return this._commonService.getRequest(`Right/GetRightOfUser?userName=${userName}`).pipe(
      map((data: any) => {
        return data;
      }),
    );
  }

  GetRightTree() {
    return this._commonService.getRequest(`Right/GetRightTree`).pipe(
      map((data: any) => {
        return data;
      }),
    );
  }

  UpdateOrderTree(dataTree: any) {
    return this._commonService.putRequest('Right/Update-Order', dataTree[0]);
  }

  Update(data: any) {
    return this._commonService.putRequest('Right/Update', data);
  }

  insert(data: any) {
    return this._commonService.postRequest('Right/Insert', data);
  }

  delete(data: any) {
    return this._commonService.deleteRequest('Right/Delete', data);
  }
}
