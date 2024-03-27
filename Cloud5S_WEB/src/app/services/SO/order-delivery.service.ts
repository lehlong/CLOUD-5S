import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderDeliverySearchFilter} from 'src/app/@filter/SO/order-delivery.filter';

@Injectable({
  providedIn: 'root',
})
export default class OrderDeliveryService {
  constructor(private commonService: CommonService) {}
  search(filters: OrderDeliverySearchFilter) {
    return this.commonService.getRequest(`OrderBatch/Search`, filters);
  }
  ExportExcel(pagination?: OrderDeliverySearchFilter) {
    return this.commonService.getFileRequest(`OrderBatch/Export`, pagination);
  }
  Insert(parameters?: any) {
    return this.commonService.postRequest(`OrderBatch/Insert`, parameters);
  }
  GetDetail(code: string) {
    return this.commonService.getRequest(`OrderBatch/GetDetail`, {code});
  }
  Update(parameters?: any) {
    return this.commonService.putRequest(`OrderBatch/Update`, parameters);
  }
  Complete(code: string) {
    return this.commonService.putRequest(`OrderBatch/Complete`, {code: code});
  }
  CancelState(code: string) {
    return this.commonService.putRequest(`OrderBatch/CancelState`, {code: code});
  }
}
