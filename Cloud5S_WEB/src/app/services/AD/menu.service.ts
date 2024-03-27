import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {map} from 'rxjs';
import {TreeNode} from 'src/app/models/MD/tree-node.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private _commonService: CommonService) {}

  getDataForTree() {
    return this._commonService.getRequest(`Menu/GetMenuOfUser`).pipe(
      map((data: any) => {
        return data;
      }),
    );
  }

  getMenu() {
    return this._commonService.getRequest(`Menu/GetMenu`).pipe(
      map((data: any) => {
        return data;
      }),
    );
  }

  UpdateOrderTree(dataTree: any) {
    return this._commonService.putRequest('Menu/Update-Order', dataTree[0]);
  }

  Update(data: any) {
    return this._commonService.putRequest('Menu/Update', data);
  }

  addItem(data: any) {
    return this._commonService.postRequest('Menu/Insert', data);
  }

  delete(data: any) {
    return this._commonService.deleteRequest('Menu/Delete', data);
  }
}
