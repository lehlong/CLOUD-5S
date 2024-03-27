import {OrderModel} from '../SO/order.model';

export interface purchaseOrdersModel {
  id: string;
  orderCode: OrderModel;
  processType: string;
  chipperCode: string;
  pourSectionCode: string;
  pourLineCode: string;
  pourWorkingShiftCode: string;
  processDate: string;
  processWorkingShiftCode: string;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string;
}

export interface manufactureUpdate {
  code: string;
  choppingNumber: number;
  pickUpMethod? : string;
  manufactures: manufactures[];
}

export interface manufactures {
  pourSectionCode: string;
  pourLineCode: string;
  amount: number;
  itemCode: string;
  areaCode: string;
  unitCode: string;
}

export interface manufactureUpdateShift {
  processDate: string;
  processWorkingShiftCode: string;
  note: string;
  pours: pours[];
}

export interface pours {
  pourSectionCode: string;
  pourLineCode: string;
  amount: number;
  itemCode: string;
  areaCode: string;
  unitCode: string;
}
