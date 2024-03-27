import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';
export class PaymentIncomeIndexFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('month').toDate(), moment().startOf('day').toDate()];
  partnerCode: string = '';
  PartnerCode: string = '';
  isAll?: boolean = false;
}

export class PaymentIncomeIndexSearchFilter extends BaseFilter {
  ordinalNumber?: string = '';
  partnerCode?: string = '';
  partnerName?: string = '';
  phoneNumber?: string = '';
  address?: string = '';
  firstPeriod?: string = '';
  inPeriod?: string = '';
  payInPeriod?: string = '';
  lastPeriod?: string = '';
  PartnerCode?: string = '';
  FromDate?: string = '';
  ToDate?: string = '';
  IsAll?: boolean = false;
}

export class PaymentIncomeDetailFilter {
  PartnerCode?: string = '';
  FromDate?: string = moment().startOf('month').format('DD/MM/YYYY');
  ToDate?: string = moment().startOf('day').format('DD/MM/YYYY');
}
