import {BaseFilter} from '../Common/base.filter';

export class WareHouseFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  companyCode: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
