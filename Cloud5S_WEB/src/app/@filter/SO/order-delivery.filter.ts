import * as moment from 'moment';
import {BaseFilter} from '../Common/base.filter';

export class OrderDeliverySearchFilter extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  VehicleCode?: string = '';
  ShipCode?: string = '';
  code?: string = '';
  State?: string = '';
}
