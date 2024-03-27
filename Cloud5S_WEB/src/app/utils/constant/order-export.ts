export const EORDER_EXPORT_STEPS = {
  KHOI_TAO: 'KHOI_TAO',
  DA_XAC_NHAN: 'DA_XAC_NHAN',
  DA_BI_HUY: 'DA_BI_HUY',
};
export const ETYPE_EXPORTS = {
  TM: 'Thương mại',
  SX: 'Sản xuất',
};
export const LIST_ORDER_EXPORT: {[key: string]: {name: string; value: string; color: string; background: string}} = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    value: EORDER_EXPORT_STEPS.KHOI_TAO,
    color: '#ffffff',
    background: '#CCCCCC',
  },
  DA_XAC_NHAN: {
    name: 'Đã xác nhận',
    value: EORDER_EXPORT_STEPS.DA_XAC_NHAN,
    color: '#ffffff',
    background: '#800080',
  },
  DA_BI_HUY: {
    name: 'Đã bị hủy',
    value: EORDER_EXPORT_STEPS.DA_BI_HUY,
    color: '#ffffff',
    background: '#FF0000',
  },
};
export const ORDER_EXPORT_TYPE: {[key: string]: {name: string; value: string}} = {
  TM: {name: ETYPE_EXPORTS.TM, value: 'TM'},
  SX: {name: ETYPE_EXPORTS.SX, value: 'SX'},
};

export const LIST_TYPE = [
  {
    name: 'Thương mại',
    value: 'TM',
  },
  {
    name: 'Sản xuất',
    value: 'SX',
  },
];

export const PAYMENT_METHODS: {[key: string]: {name: string}} = {
  CK: {name: 'Chuyển khoản'},
  TM: {name: 'Sản xuất'},
};

export const LIST_PAYMENT_METHOD = [
  {
    name: 'Chuyển khoản',
    value: 'CK',
  },
  {
    name: 'Tiền mặt',
    value: 'TM',
  },
];
