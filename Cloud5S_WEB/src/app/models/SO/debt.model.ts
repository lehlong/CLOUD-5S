import {OrderReleaseModel} from './order-release.model';

export interface DebtModel {
  code?: string;
  state?: string;
  partnerCode?: string;
  partnerNote?: string;
  areaCode?: string;
  pourDate?: string;
  pourLocation?: string;
  pourCategory?: string;
  pourTypeCode?: string;
  orderCode?: string;
  exportDate?: string;
  disCount?: number;
  taxVAT?: number;
  payMoney?: number;
  orderTypeCode?: string;
  pourLatitude?: number;
  pourLongitude?: number;
  createDate?: string;
  createBy?: string;
  orderDetails?: debtDetails[];
  orderReleases?: OrderReleaseModel[];
  partner?: partnerDetails;
  mixerCode?: string;
}

export interface itemDetails {
  id: string;
  code: string;
  name: string;
  state: boolean;
  unitCode: string;
  typeCode: string;
}

export interface partnerDetails {
  id: string;
  code: string;
  name: string;
  state: boolean;
  isCustomer: boolean;
  isProvider: boolean;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface debtDetails {
  id?: string;
  orderCode?: string;
  itemCode?: string;
  isMainItem?: boolean;
  orderNumber?: number;
  sandCode?: string;
  stoneCode?: string;
  item?: itemDetails;
  price?: number;
}
