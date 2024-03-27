import * as moment from 'moment';
import {BaseFilter} from '../Common/base.filter';

export class OrderReportFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('month').toDate()];
}

export class OrderReportFilterRequest extends BaseFilter {
  FromDate?: string | null = moment().startOf('month').format('YYYY-MM-DD');
  ToDate?: string | null = moment().endOf('month').format('YYYY-MM-DD');
}
