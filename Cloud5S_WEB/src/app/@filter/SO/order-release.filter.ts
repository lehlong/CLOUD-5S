import {ORDER_RELEASE_STATES, OR_STATE_FILTER} from 'src/app/utils/constant/orderRelease';
import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class OrderReleaseFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  States: string[] | undefined = [];
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
  orderReleaseCode = '';
}
