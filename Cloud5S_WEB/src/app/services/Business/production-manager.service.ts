import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {
  ListPurchaseOrdersFilterRequest,
  ShiftBasedProductionManaementFilterRequest,
  EnterProductionInfomationFilterRequest,
  SearchGoodsReceiptFilterRequest,
  ListStockItemTransferLogFilterRequest,
  exportDataWood,
} from 'src/app/@filter/Business/production-manager.filter';
import {manufactureUpdate, manufactureUpdateShift} from 'src/app/models/Business/production-manager.model';

@Injectable({
  providedIn: 'root',
})
export class ProductionManagerService {
  constructor(private _commonService: CommonService) {}
  getListPurchaseOrders(pagination?: ListPurchaseOrdersFilterRequest) {
    return this._commonService.getRequest(`Manufacture/SearchOrder`, pagination);
  }

  latchData(parameters?: any) {
    return this._commonService.putRequest(
      `Manufacture/LatchData?LatchDate=${parameters?.LatchDate}&ShiftCode=${parameters?.ShiftCode}`,
      null,
    );
  }

  unLatchData(parameters?: any) {
    return this._commonService.putRequest(
      `Manufacture/UnLatchData?LatchDate=${parameters?.LatchDate}&ShiftCode=${parameters?.ShiftCode}`,
      null,
    );
  }

  saveData(parameters?: manufactureUpdate) {
    return this._commonService.putRequest(`Manufacture/BatchUpdate`, parameters);
  }

  getListShiftBasedProductionManagement(pagination?: ShiftBasedProductionManaementFilterRequest) {
    return this._commonService.getRequest(`Manufacture/Shift`, pagination);
  }

  getListProductionInfomation(pagination?: EnterProductionInfomationFilterRequest) {
    return this._commonService.getRequest(`Manufacture/ShiftDetail`, pagination);
  }

  getImportSearch(pagination?: SearchGoodsReceiptFilterRequest) {
    return this._commonService.getRequest(`Manufacture/ImportSearch`, pagination);
  }

  getListGoodsReceipt(pagination?: SearchGoodsReceiptFilterRequest) {
    return this._commonService.getRequest(`Manufacture/Search`, pagination);
  }

  updateDateShift(parameters?: manufactureUpdateShift) {
    return this._commonService.putRequest(`Manufacture/BatchUpdateShift`, parameters);
  }

  transferSectionLine(parameters?: any) {
    return this._commonService.putRequest(`StockItemDetail/Transfer`, parameters);
  }
  getListStockItemTransferLog(pagination?: ListStockItemTransferLogFilterRequest) {
    return this._commonService.getRequest(`StockItemTransferLog/Search`, pagination);
  }

  ExportDataManufacture(date?: exportDataWood) {
    return this._commonService.getFileRequest(`Manufacture/Export`, date);
  }
}
