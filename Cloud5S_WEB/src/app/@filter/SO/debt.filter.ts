import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class DebtFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  States?: string[] = [];
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
}

export class DebtFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD')
  ToDate?: string = moment().format('YYYY-MM-DD');
  States?: string[] = [];
  PartnerCode: string = '';
  ItemCode: string = '';
}

export class DebtDetail {
  code?: string = '';
}
