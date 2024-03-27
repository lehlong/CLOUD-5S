export class StockImportDetail {
  code: string = '';
}

export interface ConfirmOrderImport {
  code: string;
}
export interface ConfirmOrderImportCancel {
  code: string;
}

export interface OrderImportModel {
  code?: string;
  partnerCode?: string;
  stockCode?: string;
  vehicleCode?: string;
  driverName?: string;

  state?: string;
  type?: string;
  importDate?: string;

  discount: number;
  taxVat: number;
  sumMoney: number;
  payMoney: number;

  partner?: Partner;
  stock?: Stock;
  importDetails?: importDetails[];

  createDate?: string;
  createBy?: string;
}
export interface OrderImportModelInsert {
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
export interface OrderImportModelUpdate {
  code: string;
  partnerCode: string;
  stockCode: string;
  vehicleCode: string;
  driverName: string;
  importDate: string;
  discount: number;
  taxVat: number;
  sumMoney: number;
  payMoney: number;
  debt: number;
  importDetails: importDetailUpdate[];
}

export interface importDetailUpdate {
  itemCode: string;
  number: number;
  price: number;
  sumMoney: number;
}

export interface Partner {
  id?: string;
  code?: string;
  name?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  isActive?: boolean;
}
export interface Stock {
  code?: string;
  name?: string;
  isActive?: boolean;
}

export interface importDetails {
  id?: string;
  importCode?: string;
  itemCode?: string;

  number?: number;
  price: number;
  sumMoney: number;
  item?: item;

  stockCode?: string;
  amount?: number;
  note?: string;
  import?: string | null;
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
