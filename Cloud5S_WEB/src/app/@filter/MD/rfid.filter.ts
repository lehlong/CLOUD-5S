import {BaseFilter} from '../Common/base.filter';

export class rfidFilter extends BaseFilter {
  code: string = '';
  vehicleCode: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
