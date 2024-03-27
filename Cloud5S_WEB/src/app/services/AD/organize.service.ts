import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {map} from 'rxjs';
import {TreeNode} from 'src/app/models/MD/tree-node.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizeService {
  constructor(private _commonService: CommonService) {}

  GetOrganizeTree(businessCode: string) {
    return this._commonService.getRequest(`Organize/GetOrganizeTree/${businessCode}`).pipe(
      map((data: any) => {
        return data;
      }),
    );
  }

  UpdateOrderTree(dataTree: any) {
    return this._commonService.putRequest('Organize/Update-Order', dataTree[0]);
  }

  Update(data: any) {
    return this._commonService.putRequest('Organize/Update', data);
  }

  insert(data: any) {
    return this._commonService.postRequest('Organize/Insert', data);
  }

  delete(data: any) {
    return this._commonService.deleteRequest('Organize/Delete', data);
  }
}
