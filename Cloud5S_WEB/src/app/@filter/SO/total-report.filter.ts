import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class TotalReportFilter extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  code: string = '';
  itemCode: string = '';
  PartnerCode: string = '';
  itemType: string = '';
  StockCode: string = '';
  Createby: string = '';
  name: string = '';
  createBy: string = '';
}
