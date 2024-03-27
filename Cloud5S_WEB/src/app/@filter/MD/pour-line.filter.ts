import {BaseFilter} from '../Common/base.filter';

export class PourlineFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  sectionCode: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
