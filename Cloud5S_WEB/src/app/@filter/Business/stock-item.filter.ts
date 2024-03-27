import {BaseFilter} from '../Common/base.filter';

export class StockItemFilter extends BaseFilter {
  stockCode: string = '';
  itemCode: string = '';
  Amount?: string = '';
  code: string = '';
  name: string = '';
  unitCode: string = '';
  stock: string = '';
  itemType: string = '';
  typeCode: string = '';
}
