export interface IncomeModel {
  code?: string;
  state?: string;
  type: IncomeType;
  partnerCode?: string;
  paymentMethod: string;
  paymentDate: string;
  senderName: string;
  senderPhoneNumber?: string;
  senderAddress?: string;
  bankAccountId?: string;
  money: number;
  reason?: string;
  note?: string;
  createBy?: string;
  createDate?: string;
  updateBy?: string;
  updateDate?: string;
}

export interface IncomeType {
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
