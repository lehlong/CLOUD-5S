import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class OrderExportFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  PartnerCode: string = '';
  orderExport: string = '';
  // type: string | null = null;
}

export class OrderExportFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  PartnerCode: string = '';
}

export class OrderBerthFilter {
  code: string = '';
  berthCode: string = '';
  cargoCompartmentNumber: number = 0;
  shipCode: string = '';
}
