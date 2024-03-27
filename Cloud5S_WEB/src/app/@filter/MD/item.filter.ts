import {BaseFilter} from '../Common/base.filter';

export class ItemFilter extends BaseFilter {
  TypeCode: string = '';
  code: string = '';
}

export class ItemNotifyFilter extends BaseFilter {
  GroupId: string = ''
}
