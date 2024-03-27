import {itemFormula} from '../MD/item.model';
import {UnitModel} from '../MD/unit.model';

export interface OrderModel {
  code?: string;
  state?: string;
  partnerCode?: string;
  orderBatchCode?: string;
  stationCode?: string;
  purchasingMethod?: string;
  type: string;
  areaCode?: string;
  isPaid?: number;
  companyCode: string;
  companyType: string;
  orderDate: string;
  vehicleCode: string;
  driverName: string;
  note: string;
  createBy?: string;
  createDate?: string;
  updateBy?: string;
  updateDate?: string;
}

export interface itemDetails {
  id: string;
  code: string;
  name: string;
  unit: UnitModel;
  itemFormula: itemFormula;
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

export interface orderDetails {
  id?: string;
  orderCode?: string;
  itemCode: string;
  orderNumber: number;
  releaseNumber: number;
  price?: number;
  sumMoney?: number;
  item?: itemDetails;
}

export interface updateMixerOrders {
  orderCode: string;
  mixerCode: string;
}
