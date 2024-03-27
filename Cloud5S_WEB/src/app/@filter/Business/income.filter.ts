import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class IncomeFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  incomeType: string = '';
  paymentMethod: string = '';
  partnerCode: string = '';
  code?: string = '';
}
export class IncomeFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  IncomeType: string = '';
  PaymentMethod: string = '';
  PartnerCode: string = '';
}
export class IncomeFilterDetail {
  code: string = '';
}
