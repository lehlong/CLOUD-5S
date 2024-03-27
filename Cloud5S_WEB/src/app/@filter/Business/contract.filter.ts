import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class ContractFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  code?: string = '';
  Type: string = '';
  PartnerCode: string = '';
}

export class ContractFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  Type: string = '';
  PartnerCode: string = '';
}
