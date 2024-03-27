import {BaseFilter} from '../Common/base.filter';

export class ProviderFilter extends BaseFilter {
  code!: string;
  name!: string;
  isActive: boolean | string = true;
  address!: string;
  phoneNumber!: string;
  email!: string;
  isCustomer!: boolean | string;
  isProvider?: boolean | string = true;
}
export interface optionsGroup {
  id: string;
  name: string;
}
