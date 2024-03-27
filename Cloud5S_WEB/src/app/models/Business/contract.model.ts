export interface ContractModel {
  code?: string;
  details?: contractDetails[];
  endDate?: string;
  note?: string;
  content?: string;
  partner?: Partner;
  partnerCode?: string;
  releaseDate?: string;
  startDate?: string;
  state?: string;
  totalMoney?: number;
  type?: string;
}

export interface contractDetails {
  contractCode: string;
  id: string;
  item: item;
  itemCode: string;
  orderNumber: number;
  price: number;
  sumMoney: number;
}

export interface item {
  code: string;
  costPrice: number;
  id: string;
  isActive: boolean;
  itemFormula?: any;
  itemType?: any;
  name: string;
  ordinalNumber?: number;
  sellPrice: number;
  typeCode: string;
  unit?: any;
  unitCode: string;
  amount?: number;
  totalMoney?: number;
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

export class ContractDetail {
  Id: string = '';
}

export interface ContractCancel {
  code: string;
}
