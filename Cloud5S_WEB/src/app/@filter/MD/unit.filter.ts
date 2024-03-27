import {BaseFilter} from '../Common/base.filter';

export class UnitFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
