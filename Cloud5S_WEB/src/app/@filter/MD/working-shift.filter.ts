import {BaseFilter} from '../Common/base.filter';

export class WorkingShiftFilter extends BaseFilter {
  id?: string = '';
  code: string = '';
  name: string = '';
  endTime: string = '';
  startTime: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
