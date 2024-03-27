import * as moment from 'moment';
import {BaseFilter} from '../Common/base.filter';

export class ExportTableFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  orderExport: string = '';
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  PartnerCode: string = '';
}
