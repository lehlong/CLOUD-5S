import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class ReportStockItemFilter extends BaseFilter {
  ItemCode: string = '';
  StockCode: string = '';
  CompanyCode: string = '';
  UnitCode: string = '';
}
