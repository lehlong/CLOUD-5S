import {PLAN_MANAGEMENT} from 'src/app/utils/constant/plan-management';
import {BaseFilter} from '../Common/base.filter';
import * as moment from 'moment';

export class PlanFilter extends BaseFilter {
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  selectedRange_1: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  selectedRange_2: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  States?: string[] = PLAN_MANAGEMENT.map((i: any) => i.value);
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
  MixerCode: string = '';
  IsSetReleaseDate!: boolean;
}

export class PlanFilterRequest extends BaseFilter {
  FromPourDate?: string = moment().subtract(3, 'days').format('YYYY-MM-DD')
  ToPourDate?: string = moment().format('YYYY-MM-DD');
  States?: string[] = PLAN_MANAGEMENT.map((i: any) => i.value);
  PartnerCode: string = '';
  ItemCode: string = '';
  MixerCode: string = '';
}
