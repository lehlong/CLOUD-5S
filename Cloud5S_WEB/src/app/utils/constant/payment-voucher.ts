export const STATE_PAYMENT_VOUCHER: {[key: string]: {name: string; background: string; color: string; value: string}} =
  {
    KHOI_TAO: {
      name: 'Khởi tạo',
      background: '#CCCCCC',
      color: '#ffffff',
      value: 'KHOI_TAO',
    },
    DA_XAC_NHAN: {
      name: 'Đã xác nhận',
      background: '#228B22',
      color: '#ffffff',
      value: 'DA_XAC_NHAN',
    },
    DA_BI_HUY: {
      name: 'Đã bị huỷ',
      background: '#FF0000',
      color: '#ffffff',
      value: 'DA_BI_HUY',
    },
  };

export const PAYMENT_METHOD = [
  {
    name: 'Chuyển khoản',
    value: 'CHUYEN_KHOAN',
  },
  {
    name: 'Tiền mặt',
    value: 'TIEN_MAT',
  },
];

export const METHOD_NAME = {
  CHUYEN_KHOAN: 'Chuyển khoản',
  TIEN_MAT: 'Tiền mặt',
};
