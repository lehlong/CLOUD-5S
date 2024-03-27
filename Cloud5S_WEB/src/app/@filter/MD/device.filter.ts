import {BaseFilter} from '../Common/base.filter';

export class DeviceFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  typeCode?: string = '';
  groupCode?: string = '';
  ipAddress?: string = '';
  ipPort?: string | number = '';
  devicePort?: string | number = '';
  username?: string = '';
  password?: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
