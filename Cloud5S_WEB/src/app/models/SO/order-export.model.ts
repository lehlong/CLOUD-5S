export interface OrderExportModel {
  code: string;
  type: string;
  exportDate: Date;
  partnerCode: string;
  state: string;
  orderCode: string;
  discount: number;
  taxVat: number;
  sumMoney: number;
  payMoney: number;
  debt: number;
  isPaymentNow: boolean;
  paymentType: string;
  paymentMethod: string;
  senderName: string;
  senderAddress: string;
  senderPhoneNumber: string;
  bankAccountId: string;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
}

export interface OrderExportCreateModel {
  type: string;
  exportDate: Date;
  partnerCode: string;
  stockCode: string;
  vehicleCode: string;
  driverName: string;
  orderCode: string | null;
  discount: number;
  taxVat: number;
  sumMoney: number;
  payMoney: number;
  debt: number;
  isPaymentNow: boolean;
  paymentType: string;
  paymentMethod: string;
  senderName: string;
  senderAddress: string;
  senderPhoneNumber: string;
  bankAccountId: string;
  exportDetails: ExportDetail[];
}

export interface OrderExportUpdateModel {
  code: string;
  type: string;
  exportDate: Date;
  partnerCode: string;
  stockCode: string;
  vehicleCode: string;
  driverName: string;
  orderCode: string | null;
  discount: number;
  taxVat: number;
  sumMoney: number;
  payMoney: number;
  debt: number;
  isPaymentNow: boolean;
  paymentType: string;
  paymentMethod: string;
  senderName: string;
  senderAddress: string;
  senderPhoneNumber: string;
  bankAccountId: string;
  exportDetails: ExportDetail[];
}

export interface ExportDetail {
  itemCode: string;
  isMainItem: boolean;
  orderNumber: number;
  number: number;
  price: number;
  sumMoney: number;
}
