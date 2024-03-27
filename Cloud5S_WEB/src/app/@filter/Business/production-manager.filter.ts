import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';
import {PROCESS_TYPE, ORDER_TYPES} from 'src/app/utils/constant/index';

export class ListPurchaseOrdersFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('day').toDate(), moment().endOf('day').toDate()];
  workingShiftCode: string = '';
  state?: string[] = [];
  vehicleCode?: string = '';
  partnerCode: string = '';
  type: string = ORDER_TYPES['NHAP_HANG'].value;
}

export class ListPurchaseOrdersFilterRequest extends BaseFilter {
  fromDate?: string = moment().format('YYYY-MM-DD');
  toDate?: string = moment().format('YYYY-MM-DD');
  workingShiftCode: string = '';
  state?: string[] = [];
  vehicleCode?: string = '';
  partnerCode: string = '';
  type: string = ORDER_TYPES['NHAP_HANG'].value;
}

export class ShiftBasedProductionManaementFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('day').toDate(), moment().endOf('day').toDate()];
  workingShiftCode: string = '';
}
export class exportDataWood {
  date: string | null = moment().format('YYYY-MM-DD');
}

export class ShiftBasedProductionManaementFilterRequest extends BaseFilter {
  fromDate?: string | null = moment().format('YYYY-MM-DD');
  toDate?: string | null = moment().format('YYYY-MM-DD');
  workingShiftCode: string = '';
}

export class EnterProductionInfomationFilter extends BaseFilter {
  processDate: string = moment().format('YYYY-MM-DD');
  WorkingShiftCode: string = '';
  note: string = '';
}

export class EnterProductionInfomationFilterRequest extends BaseFilter {
  processDate: string | null = moment().format('YYYY-MM-DD');
  WorkingShiftCode: string = '';
}

export class SearchGoodsReceiptFilter {
  selectedRangeImport: Date[] = [];
  vehicleCode?: string = '';
  partnerCode: string = '';
  areaCode: string = '';
  pourSectionCode: string = '';
  pourLineCode: string = '';
  processType: string = PROCESS_TYPE['HA_BAI'].value;
  isOnShift: boolean = false;
  importWorkingShiftCode: string = '';
  currentPage: number = 1;
  pageSize: number = 20000;
  keyWord: string = '';
}

export class SearchGoodsReceiptFilterRequest {
  fromDateImport?: string | null = null;
  toDateImport?: string | null = null;
  vehicleCode?: string = '';
  partnerCode: string = '';
  areaCode: string = '';
  pourSectionCode: string = '';
  pourLineCode: string = '';
  processType: string = PROCESS_TYPE['HA_BAI'].value;
  isOnShift: boolean = false;
  importWorkingShiftCode: string = '';
  currentPage: number = 1;
  pageSize: number = 20000;
  keyWord: string = '';
}

export class ListStockItemTransferLogFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('day').toDate(), moment().endOf('day').toDate()];
  state?: string[] = [];
  areaCode?: string = '';
  companyCode?: string = '';
  itemCode?: string = '';
  stockCode?: string = '';
}
export class ListStockItemTransferLogFilterRequest extends BaseFilter {
  fromDate?: string = moment().format('YYYY-MM-DD');
  toDate?: string = moment().format('YYYY-MM-DD');
  state?: string[] = [];
  areaCode?: string = '';
  companyCode?: string = '';
  itemCode?: string = '';
  stockCode?: string = '';
}
