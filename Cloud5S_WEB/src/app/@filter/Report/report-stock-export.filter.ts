import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class ReportStockExportFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(7, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  code: string = '';
  itemCode: string = '';
  PartnerCode: string = '';
  itemType: string = '';
  StockCode: string = '';
  account: string = '';
}

export class ReportStockExportFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(7, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  itemCode: string = '';
  PartnerCode: string = '';
  itemType: string = '';
  StockCode: string = '';
  account: string = '';
}
