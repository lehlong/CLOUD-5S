import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class ReportStockImportFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(7, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  code: string = '';
  itemCode: string = '';
  PartnerCode: string = '';
  itemType: string = '';
  StockCode: string = '';
  Createby: string = '';
  name: string = '';
  createBy: string = '';
}

export class ReportStockImportFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(7, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  itemCode: string = '';
  PartnerCode: string = '';
  itemType: string = '';
  StockCode: string = '';
  Createby: string = '';
  name: string = '';
  createBy: string = '';
}
