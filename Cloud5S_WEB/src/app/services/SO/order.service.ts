import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderDetail, OrderFilterRequest, ExportVehicleFilterRequest} from 'src/app/@filter/SO/order.filter';
import {OrderModel, updateMixerOrders} from 'src/app/models/SO/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: OrderFilterRequest) {
    return this._commonService.getRequest(`Order/Search`, pagination);
  }

  SearchOrderByUpdate(filters: OrderFilterRequest) {
    return this._commonService.getRequest(`Order/SearchOrderByUpdate`, filters);
  }

  Tracking(pagination?: OrderFilterRequest) {
    return this._commonService.getRequest(`OrderRelease/Search`, pagination);
  }

  ExportExcel(pagination?: OrderFilterRequest) {
    return this._commonService.getFileRequest(`Order/Export`, pagination);
  }

  GetDetail(pagination?: OrderDetail) {
    return this._commonService.getRequest(`Order/GetDetail`, pagination);
  }

  Insert(parameters?: OrderModel) {
    return this._commonService.postRequest(`Order/Insert`, parameters);
  }

  Update(parameters?: OrderModel) {
    return this._commonService.putRequest(`Order/Update`, parameters);
  }

  ConfirmState(parameters?: any) {
    return this._commonService.putRequest(`Order/ConfirmState`, parameters);
  }

  ConfirmPay(parameters?: any) {
    return this._commonService.putRequest(`Order/ConfirmPay`, parameters);
  }

  Delete(parameters?: OrderModel) {
    return this._commonService.deleteRequest(`Order/Delete`, parameters);
  }

  UpdateStep(parameters?: any) {
    return this._commonService.putRequest(`Order/UpdateStep`, parameters);
  }

  CompleteState(parameters?: any) {
    return this._commonService.putRequest(`Order/CompleteState`, parameters);
  }

  RejectState(parameters?: any) {
    return this._commonService.putRequest(`Order/RejectState`, parameters);
  }

  CancelState(parameters?: any) {
    return this._commonService.putRequest(`Order/CancelState`, parameters);
  }

  CancelPay(parameters?: any) {
    return this._commonService.putRequest(`Order/CancelPay`, parameters);
  }

  CompleteMixState(parameters?: any) {
    return this._commonService.putRequest(`Order/CompleteMixState`, parameters);
  }

  UpdateMixerOrders(parameters?: updateMixerOrders) {
    return this._commonService.putRequest(`Order/Update-mixer-orders`, parameters);
  }

  UpdateBerth(parameters?: any) {
    return this._commonService.putRequest(`Order/UpdateBerth`, parameters);
  }

  ExportCargo(parameters?: any) {
    return this._commonService.getRequest(`Order/ExportCargo`, parameters);
  }

  ExportCargoDownload(parameters?: any) {
    return this._commonService.getFileRequest(`Order/ExportCargoDownload`, parameters);
  }

  ExportVehicle(pagination?: ExportVehicleFilterRequest) {
    return this._commonService.getRequest(`Order/ExportVehicle`, pagination);
  }

  ExportVehicleDownload(pagination?: ExportVehicleFilterRequest) {
    return this._commonService.getFileRequest(`Order/ExportVehicleDownload`, pagination);
  }
}
