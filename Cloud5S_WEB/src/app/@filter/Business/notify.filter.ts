import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';


export class NotifyFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  id: string = '';
}
export class NotifyFilterRequest extends BaseFilter {
  FromDate: string = moment().subtract(3, 'days').format('YYYY-MM-DD')
  ToDate: string = moment().format('YYYY-MM-DD');
  id: string = '';
}