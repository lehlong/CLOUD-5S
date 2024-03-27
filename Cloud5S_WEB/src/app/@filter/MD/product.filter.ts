import {BaseFilter} from '../Common/base.filter';

export class ProductFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  isActive: boolean | string = '';
  isManufacture: boolean | string = '';
  unitCode: string = '';
  typeCode: string = '';
  costPrice: string = '';
  sellPrice: string = '';
  isMainObject: boolean | string = '';
  isQuantitative: boolean | string = '';
  itemCode: string = '';
  cement: string = '';
  stone: string = '';
  sand: string = '';
  admixture: string = '';
  water: string = '';
  isIngredient: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
