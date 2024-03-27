import {PLAN_MANAGEMENT} from 'src/app/utils/constant/plan-management';
import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class HumidityFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  PartnerCode: string = '';
  VehicleCode: string = '';
  AreaCode: string = '';
  code!: string;
  IsEmptyInfor : boolean  = true;
  IsFullInfor : boolean = true;
}

export class HumidityFilterRequest extends BaseFilter {
  PartnerCode!: string;
  VehicleCode!: string;
  AreaCode!: string;
  FromDate!: string;
  ToDate!: string ;
  Type? : string = 'NHAP_HANG';
  IsFullInfor? : boolean = true;
  IsEmptyInfor? : boolean = true;
}

export class HumidityReportFilterRequest  {
  AreaCode!: string;
  FromDate!: string;
  ToDate!: string ;
  Type? : string = 'NHAP_HANG'
}
export class HumidityReportFilter  extends BaseFilter{
  PartnerCode!: string;
  VehicleCode!: string;
  AreaCode!: string;
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  Type? : string = 'NHAP_HANG'
}
export class ExportReportFilterRequest  {
  AreaCode!: string;
  FromDate!: string;
  ToDate!: string ;
}