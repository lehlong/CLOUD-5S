import {BaseFilter} from '../Common/base.filter';

export class PricePolicyFilter extends BaseFilter {
  id: string = '';
  areaCode : string = '';
  itemCode : string = '';
  fromDate? : string ;
  toDate?: string;
}
export interface optionsGroup {
  id: string;
  name: string;
}
