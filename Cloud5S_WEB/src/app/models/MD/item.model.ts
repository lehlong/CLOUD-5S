export interface ItemModel {
  id: string;
  code: string;
  name: string;
  unitCode: string;
  typeCode: string;
  costPrice: number;
  sellPrice: number;
  proportion: string | null;
  percentageOfImpurities: string | null;
  isMainObject: true;
  isQuantitative: false;
  itemFormula: itemFormula;
  unit: unit;
  itemType: itemType;
  isActive: boolean | null;
}

export interface itemFormula {
  id: string;
  itemCode: string;
  cement: number;
  stone: number;
  sand: number;
  admixture: number;
  water: number;
  isActive: boolean | null;
}

export interface unit {
  code: string;
  name: string;
  isActive: boolean | null;
}

export interface itemType {
  code: string;
  name: string;
  isActive: boolean | null;
}

export interface ItemSelect extends ItemModel {
  number: number;
}
export interface ItemSelected extends ItemModel {
  amount: number;
}
