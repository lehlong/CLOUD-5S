export interface PaymentVoucherModel {
  code?: string;
  state?: string;
  type?: PayType[];
  partnerCode?: string;
  PaymentMethod?: string;
  reason?: string;
  paymentDate?: string;
  receiverName?: string;
  receiverAddress?: string;
  receiverPhoneNumber?: string;
  bankAccountId?: string;
  money?: number;
  note?: string;
  createBy?: string;
  createDate?: string;
  updateBy?: string;
  updateDate?: string;
}

export interface PayType {
  id: string;
  name: string;
  note: string;
  isActive: boolean;
  isDeleted: boolean;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string;
}
