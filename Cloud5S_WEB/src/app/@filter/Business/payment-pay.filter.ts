import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';
export class PaymentPayIndexFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('month').toDate(), moment().startOf('day').toDate()];
  partnerCode: string = '';
  PartnerCode: string = '';
  isAll?: boolean = false;
}

export class PaymentPayIndexSearchFilter extends BaseFilter {
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
  FromDate?: string | null;
  ToDate?: string | null;
  IsAll?: boolean = false;
}

export class PaymentPayDetailFilter {
  PartnerCode?: string = '';
  FromDate?: string = moment().startOf('month').format('DD/MM/YYYY');
  ToDate?: string = moment().startOf('day').format('DD/MM/YYYY');
}
