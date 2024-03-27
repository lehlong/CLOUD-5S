export class NotifyDetail {
  code: string = '';
}

export interface NotifyModel {
  contents: string;
  createBy?: string;
  createDate?: string;
  headings?: string;
  id?: number;
  senderName?: string;
  subtitle?: string;
  seen?: number;
  notSeen?: number;
  details?: notifyDetails[];
  data2?: any;
}

export interface notifyDetails {
  createBy?: string;
  createDate?: string;
  id?: number;
  notificationId?: number;
  receiverName?: string;
  isSeen?: boolean;
  account: account;
  updateDate?: string;
}
export interface account {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface itemNotify {
  id: string;
  code: string;
  name: string;
  userName: string;
  phoneNumber: string;
  email: string;
  address: string;
  nameAccountGroup?: string;
}
export interface NotifyInsertModel {
  subtitle: string;
  contents: string;
  url?: any;
  details?: itemDetails[];
}
export interface itemDetails {
  receiverName: string;
}
export interface NotificationModel {
  id: string;
  createDate: string;
  headings: string;
  notSeen: number;
  receiverName: string[];
  seen: number;
}
