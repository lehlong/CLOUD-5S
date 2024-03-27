import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class PaymentVoucherFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  PayType: string = '';
  PaymentMethod: string = '';
  PartnerCode: string = '';
  code?: string = '';
}

export class PaymentVoucherFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  PayType: string = '';
  PaymentMethod: string = '';
  PartnerCode: string = '';
}

export class PaymentVoucherFilterDetail {
  code:string = '';
}
