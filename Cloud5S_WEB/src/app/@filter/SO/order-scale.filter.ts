import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';
export class OrderScaleFilter extends BaseFilter {
  selectedRange: Date[] = [moment().startOf('month').toDate(), moment().endOf('month').toDate()];
  PartnerCode: string = '';
  ItemCode: string = '';
  VehicleCode: string = '';
  code: string = '';
  station: string = '';
  orderType: string = '';
  scaleTypeCode: string[] = [];
  areaCode: string = '';
  companyCode: string = '';
}

export class OrderScaleFilterRequest {
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
}

export class OrderDetail {
  code?: string = '';
}
