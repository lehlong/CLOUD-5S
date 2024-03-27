import { BaseFilter } from '../Common/base.filter';

export class StoneFilter extends BaseFilter {
    code:string = '';
    name: string = '';
    state: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
