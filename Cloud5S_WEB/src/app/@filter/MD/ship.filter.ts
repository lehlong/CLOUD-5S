import {BaseFilter} from '../Common/base.filter';

export class ShipFilter extends BaseFilter {
  code: string = '';
  name?: string = '';
  tonage?: number;
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
