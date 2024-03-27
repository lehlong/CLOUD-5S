export class StockImportDetail {
  code: string = '';
}

export interface StockCancel {
  code: string;
  state: string;
}

export interface StockImportModel {
  code?: string;
  state?: string;
  type?: string;
  note?: string;
  vehicle?: string;
  importDate?: string;
  createDate?: string;
  createBy?: string;
  partner?: Partner;
  stock?: Stock;
  creator?: any;
  importDetails?: importDetails[];
}
export interface Partner {
  code?: string;
  name?: string;
}
export interface Stock {
  code?: string;
  name?: string;
}

export interface importDetails {
  id?: string;
  importCode?: string;
  itemCode?: string;
  stockCode?: string;
  amount?: number;
  note?: string;
  import?: string | null;
  item?: item;
}

export interface item {
  id: string;
  code: string;
  name: string;
  unitCode: string;
  typeCode: string;
  costPrice: number;
  sellPrice: number;
  proportion: string | null;
  percentageOfImpurities: string | null;
  isMainObject: boolean;
  isQuantitative: boolean;
  itemFormula: itemFormula;
  unit: unit;
  itemType: itemType;
  isActive: true;
  note?: string;
  amount?: number;
  stock?: any;
  totalMoney?: number
}

export interface unit {
  code: string;
  name: string;
  isActive: boolean | null;
}

export interface itemType {
  code: string;
  name: string;
  isActive: boolean;
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

export class StockExportDetail {
  code: string = '';
}
export interface StockExportModel {
  code?: string;
  state?: string;
  type?: string;
  note?: string;
  vehicle?: string;
  exportDate?: string;
  exportDetails?: exportDetails[];
}

export interface exportDetails {
  id?: string;
  exportCode?: string;
  itemCode?: string;
  stockCode?: string;
  amount?: number;
  note?: string;
  export?: string | null;
  item?: item;
}
