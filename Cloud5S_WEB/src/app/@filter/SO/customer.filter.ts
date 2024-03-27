import {BaseFilter} from '../Common/base.filter';

export class CustomerFilter extends BaseFilter {
  code!: string;
  name!: string;
  isActive: boolean | string = true;
  address!: string;
  phoneNumber!: string;
  email!: string;
  isProvider!: boolean | null | string;
  isCustomer?: boolean | null | string = true;
}
export interface optionsGroup {
  id: string;
  name: string;
}
