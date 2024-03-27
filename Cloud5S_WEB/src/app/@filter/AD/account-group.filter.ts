import {BaseFilter} from '../Common/base.filter';

export class AccountGroupFilter extends BaseFilter {
  id?: string;
  name?: string;
  notes?: string;
  isActive?: boolean | string;
}
