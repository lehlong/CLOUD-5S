import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class OrderFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  States?: string[] = [];
  PartnerCode: string = '';
  ItemCode: string = '';
  code?: string = '';
}

export class OrderExportFilter extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  States?: string[] = [];
  VehicleCode?: string = '';
  BatchCode?: string = '';
  Type?: string = '';
}

export class OrderExportVehicleFilter extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  VehicleCode?: string = '';
}

export class OrderNewFilter extends BaseFilter {
  // selectedRange: Date[] = [moment().subtract(2, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  selectedRange: Date[] = [moment().startOf('day').toDate(), moment().endOf('day').toDate()];
  States?: string[] = [];
  PartnerCode: string = '';
  code: string = '';
  ItemCode: string = '';
  VehicleCode: string = '';
  CompanyCode: string = '';
  AreaCode: string = '';
  Type: string = '';
  CompanyType: string = '';
  isPaid: boolean | null = null;
}

export class OrderFilterRequest extends BaseFilter {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  States?: string[] = [];
  PartnerCode?: string = '';
  ItemCode?: string = '';
  type?: string = '';
  VehicleCode?: string = '';
  BatchCode?: string = '';
}
export class ExportVehicleFilterRequest {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
}
export class OrderDetail {
  code?: string = '';
}

export class OrderCustomeFilter extends BaseFilter {
  FromDate!: string;
  ToDate!: string;
  States!: string[];
  PartnerCode!: string;
  ItemCode!: string;
  code!: string;
}
