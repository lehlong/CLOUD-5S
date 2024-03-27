import {PurchasingstationModel} from '../MD/Purchasingstation.model';
import {itemFormula} from '../MD/item.model';
import {PartnerModel} from '../MD/partner.model';
import {UnitModel} from '../MD/unit.model';

export interface OrderDeliveryModel {
  code?: string;
  state?: string;
  partnerCode?: string;
  stationCode?: string;
  purchasingMethod: string;
  type: string;
  orderDate: string;
  startDate: string;
  endDate: string;
  note: string;
  partner: PartnerModel;
  purchasingStation: PurchasingstationModel;
  orderBatchDetails: OrderBatchDetail[];
}

export interface OrderBatchDetail {
  id?: string;
  orderBatchCode?: string;
  itemCode: string;
  orderNumber: number;
  releaseNumber: number;
  price?: number;
  sumMoney?: number;
  orderBatch: any;
  item?: OrderBatchDetailItem;
}

export interface OrderBatchDetailItem {
  id: string;
  code: string;
  name: string;
  unitCode: string;
  typeCode: string;
  costPrice: number;
  sellPrice: number;
  unit: UnitModel;
  itemType: any;
  isActive: boolean;
  itemFormula: itemFormula;
}
