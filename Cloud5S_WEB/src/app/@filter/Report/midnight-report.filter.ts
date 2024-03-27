import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class MidnightReportFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('month').toDate()];
}

export class MidnightReportFilterRequest extends BaseFilter {
  FromDate?: string | null = moment().startOf('month').format('YYYY-MM-DD');
  ToDate?: string | null = moment().endOf('month').format('YYYY-MM-DD');
}
export class makeNewFilterRequest{
  FromDate?: string | null = moment().startOf('month').format('YYYY-MM-DD');
  ToDate?: string | null = moment().endOf('month').format('YYYY-MM-DD');
}
