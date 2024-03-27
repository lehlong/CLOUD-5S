import {BaseFilter} from '../Common/base.filter';

export class BankAccountFilter extends BaseFilter {
  id: string = '';
  name: string = '';
  bankAccount: string = '';
  ownerName: string = '';
  bankName: string = '';
  isActive?: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
