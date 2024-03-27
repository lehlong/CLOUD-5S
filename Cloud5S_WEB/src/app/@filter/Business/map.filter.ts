import * as moment from 'moment';

export class MapFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
  VehicleCode: string = '';
  currentPage: number = 1;
  pageSize: number = 2000;
  keyWord: string = '';
}

export class MapFilterRequest {
  FromDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD');
  ToDate?: string = moment().format('YYYY-MM-DD');
  PartnerCode: string = '';
  ItemCode: string = '';
  VehicleCode: string = '';
  currentPage: number = 1;
  pageSize: number = 2000;
  keyWord: string = '';
}
