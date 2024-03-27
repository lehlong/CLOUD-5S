import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class ReportInventoryFilter extends BaseFilter {
  ItemCode: string = '';
  CompanyCode: string = '';
  AreaCode: string = '';
  StockCode: string = '';
  PourLineCode: string = '';
  PourSectionCode: string = '';
}
