import {BaseFilter} from '../Common/base.filter';

export class DeviceTypeFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
