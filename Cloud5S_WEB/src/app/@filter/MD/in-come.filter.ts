import {BaseFilter} from '../Common/base.filter';

export class IncomeFilter extends BaseFilter {
  id: string = '';
  name: string = '';
  note: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
