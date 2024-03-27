export interface IncomeModel {
  code?: string;
  state?: string;
  type: string;
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
}
