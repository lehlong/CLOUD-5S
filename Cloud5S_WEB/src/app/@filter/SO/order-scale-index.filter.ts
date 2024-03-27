import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';
export class OrderScaleIndexFilter extends BaseFilter {
  // selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  selectedRange: Date[] = [moment().startOf('day').toDate(), moment().endOf('day').toDate()];
  PartnerCode: string = '';
  ItemCode: string = '';
  VehicleCode: string = '';
  code: string = '';
  station: string = '';
  orderType: string = '';
  scaleTypeCode: string[] = [];
  areaCode: string = '';
  companyCode: string = '';
  weight1: string | null = '0';
  weight2: string | null = '0';
}

export class OrderScaleIndexFilterRequest {
  FromDate?: string | null = moment().startOf('month').format('YYYY-MM-DD');
  ToDate?: string | null = moment().endOf('month').format('YYYY-MM-DD');
  PartnerCode: string | null = '';
  ItemCode: string | null = '';
  VehicleCode: string | null = '';
  companyCode: string | null = '';
  Type?: string[] | null = [];
  currentPage: number | null = 1;
  pageSize: number | null = 20;
  keyWord: string | null = '';
  weight1: boolean | null = false;
  weight2: boolean | null = false;
}

export class OrderDetail {
  code?: string = '';
}
