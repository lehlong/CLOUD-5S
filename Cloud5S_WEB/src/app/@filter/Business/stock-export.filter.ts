import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class StockExportFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  code: string = '';
  StockCode: string = '';
  PartnerCode: string = '';
}

export class StockExportFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
}