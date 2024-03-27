import {BaseFilter} from '../Common/base.filter';

export class PurchasingstationFilter extends BaseFilter {
  code: string = '';
  areaCode: string = '';
  name: string = '';
  address: string = '';
  phoneNumber: string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
