import {BaseFilter} from '../Common/base.filter';

export class PartnerFilter extends BaseFilter {
  code!: string;
  name!: string;
  isActive: boolean | string = true;
  address!: string;
  phoneNumber!: string;
  taxCode!: string;
  email!: string;
  isProvider!: boolean | string | null;
  isCustomer!: boolean | string | null;
}
export interface optionsGroup {
  id: string;
  name: string;
}
