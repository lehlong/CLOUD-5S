export interface SendOTP {
  userName: string;
  phoneNumber?: number;
  email?: string;
}
export interface EnterOTP {
  userName: string;
  password: string;
  otp: string;
}
