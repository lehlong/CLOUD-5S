export const STATE_ORDER_NEW: {[key: string]: {name: string; background: string; color: string; value: string}} = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    background: '#CCCCCC',
    color: '#ffffff',
    value: 'KHOI_TAO',
  },
  VAO_CONG: {
    name: 'Đã vào cổng',
    background: '#CCCCCC',
    color: '#ffffff',
    value: 'VAO_CONG',
  },
  CAN_LAN_1: {
    name: 'Cân lần 1',
    background: '#FFA500',
    color: '#ffffff',
    value: 'CAN_LAN_1',
  },
  CAN_LAN_2: {
    name: 'Cân lần 2',
    background: '#0000FF',
    color: '#ffffff',
    value: 'CAN_LAN_2',
  },
  RA_CONG: {
    name: 'Đã ra cổng',
    background: '#800080',
    color: '#ffffff',
    value: 'RA_CONG',
  },
  DEN_CANG: {
    name: 'Đã đến cảng',
    background: '#B300FF',
    color: '#ffffff',
    value: 'DEN_CANG',
  },
  DO_HANG: {
    name: 'Đã đổ hàng',
    background: '#B300FF',
    color: '#ffffff',
    value: 'DO_HANG',
  },
  DA_HUY: {
    name: 'Đã hủy',
    background: '#E3297E',
    color: '#ffffff',
    value: 'DA_HUY',
  },
};

export const STATE_ORDER_DELIVERY: {[key: string]: {name: string; background: string; color: string; value: string}} = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    background: '#CCCCCC',
    color: '#ffffff',
    value: 'KHOI_TAO',
  },
  DANG_XUAT_HANG: {
    name: 'Đang xuất hàng',
    background: '#00A6FF',
    color: '#ffffff',
    value: 'DANG_XUAT_HANG',
  },
  DA_HUY: {
    name: 'Đã huỷ',
    background: '#FF0000',
    color: '#ffffff',
    value: 'DA_HUY',
  },
  DA_KET_THUC: {
    name: 'Đã kết thúc',
    background: '#800080',
    color: '#ffffff',
    value: 'DA_KET_THUC',
  },
};

export const STATE_ORDER_PAY: {[key: string]: {name: string; background: string; color: string; value: string}} = {
  DA_THANH_TOAN: {
    name: 'Đã thanh toán',
    background: '#41C509',
    color: '#ffffff',
    value: 'DA_THANH_TOAN',
  },
  CHUA_THANH_TOAN: {
    name: 'Chưa thanh toán',
    background: '#625F63',
    color: '#ffffff',
    value: 'CHUA_THANH_TOAN',
  },
};

export const STATE_ORDER: {[key: string]: {name: string; background: string; color: string; value: string}} = {
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
  DANG_XUAT_HANG: {
    name: 'Đang xuất hàng',
    background: '#FFA500',
    color: '#ffffff',
    value: 'DANG_XUAT_HANG',
  },
  DA_XUONG_TAU: {
    name: 'Đã xuống tàu',
    background: '#0000FF',
    color: '#ffffff',
    value: 'DA_XUONG_TAU',
  },
  DA_BI_HUY: {
    name: 'Đã bị huỷ',
    background: '#FF0000',
    color: '#ffffff',
    value: 'DA_BI_HUY',
  },
  DA_TU_CHOI: {
    name: 'Đã từ chối',
    background: '#8B4513',
    color: '#ffffff',
    value: 'DA_TU_CHOI',
  },
  DA_HOAN_THANH: {
    name: 'Đã hoàn thành',
    background: '#800080',
    color: '#ffffff',
    value: 'DA_HOAN_THANH',
  },
};

export const ACTION_ORDER: {[key: string]: {name: string; value: string}} = {
  TAO_MOI: {
    name: 'Tạo mới',
    value: 'TAO_MOI',
  },
  XAC_NHAN: {
    name: 'Xác nhận',
    value: 'XAC_NHAN',
  },
  TAO_PHIEU_TRON: {
    name: 'Tạo phiếu trộn',
    value: 'TAO_PHIEU_TRON',
  },
  CAN_HANG: {
    name: 'Cân hàng',
    value: 'CAN_HANG',
  },
  HUY: {
    name: 'Huỷ',
    value: 'HUY',
  },
  TU_CHOI: {
    name: 'Từ chối',
    value: 'TU_CHOI',
  },
  CHINH_SUA: {
    name: 'Chỉnh sửa',
    value: 'CHINH_SUA',
  },
  CHOT_CONG_NO: {
    name: 'Chốt công nợ',
    value: 'CHOT_CONG_NO',
  },
  HOAN_THANH_TRON: {
    name: 'Hoàn thành trộn',
    value: 'HOAN_THANH_TRON',
  },
  HOAN_THANH: {
    name: 'Chốt công nợ',
    value: 'HOAN_THANH',
  },
};

export const ACTION_ORDER_NEW: {[key: string]: {name: string; value: string}} = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    value: 'KHOI_TAO',
  },
  VAO_CONG: {
    name: 'Vào cổng',
    value: 'VAO_CONG',
  },
  RA_CONG: {
    name: 'Ra cổng',
    value: 'RA_CONG',
  },
  CAN_LAN_1: {
    name: 'Cân lần 1',
    value: 'CAN_LAN_1',
  },
  CAN_LAN_2: {
    name: 'Cân lần 2',
    value: 'CAN_LAN_2',
  },
  DEN_CANG: {
    name: 'Đến cảng',
    value: 'DEN_CANG',
  },
  DO_HANG: {
    name: 'Đổ hàng',
    value: 'DO_HANG',
  },
  THANH_TOAN: {
    name: 'Thanh toán',
    value: 'THANH_TOAN',
  },
  HUY_THANH_TOAN: {
    name: 'Hủy thanh toán',
    value: 'HUY_THANH_TOAN',
  },
  HUY_DON: {
    name: 'Hủy đơn',
    value: 'HUY_DON',
  },
};

export const LIST_NEW_STATE = [
  {
    name: 'Khởi tạo',
    value: 'KHOI_TAO',
  },
  {
    name: 'Đã vào cổng',
    value: 'VAO_CONG',
  },
  {
    name: 'Cân lần 1',
    value: 'CAN_LAN_1',
  },
  {
    name: 'Cân lần 2',
    value: 'CAN_LAN_2',
  },
  {
    name: 'Ra cổng',
    value: 'RA_CONG',
  },
  {
    name: 'Đã đổ hàng',
    value: 'DO_HANG',
  },
  {
    name: 'Đã đến cảng',
    value: 'DEN_CANG',
  },
  {
    name: 'Đã hủy',
    value: 'DA_HUY',
  },
];

export const LIST_STATE = [
  {
    name: 'Khởi tạo',
    value: 'KHOI_TAO',
  },
  {
    name: 'Đã xác nhận',
    value: 'DA_XAC_NHAN',
  },
  {
    name: 'Đang xuất hàng',
    value: 'DANG_XUAT_HANG',
  },
  {
    name: 'Đã trộn xong',
    value: 'DA_TRON_XONG',
  },
  {
    name: 'Đã bị huỷ',
    value: 'DA_BI_HUY',
  },
  {
    name: 'Đã từ chối',
    value: 'DA_TU_CHOI',
  },
  {
    name: 'Đã hoàn thành',
    value: 'DA_HOAN_THANH',
  },
];

export const ORDER_TYPE_ITEM = {
  be_tong: 'BETONG',
  sand: 'SAND',
  stone: 'STONE',
  xebom: 'XEBOM',
};

export enum EPURCHASING_METHOD {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export const PURCHASING_METHOD: {[key: string]: {value: string; name: string}} = {
  INTERNAL: {
    value: EPURCHASING_METHOD.INTERNAL,
    name: 'Nội bộ',
  },
  EXTERNAL: {
    value: EPURCHASING_METHOD.EXTERNAL,
    name: 'Bên ngoài',
  },
};

export const LIST_PURCHASING_METHOD = [
  {
    value: EPURCHASING_METHOD.INTERNAL,
    name: 'Nội bộ',
  },
  {
    value: EPURCHASING_METHOD.EXTERNAL,
    name: 'Bên ngoài',
  },
];

export const ORDER_TYPES: {[key: string]: {name: string; value: string}} = {
  NHAP_HANG: {
    name: 'Nhập hàng',
    value: 'NHAP_HANG',
  },
  XUAT_HANG: {
    name: 'Xuất hàng',
    value: 'XUAT_HANG',
  },
  // DICH_VU: {
  //   name: 'Dịch vụ',
  // },
  // KHAC: {
  //   name: 'Khác',
  // },
};

export const SCALE_TYPES: {[key: string]: {name: string}} = {
  NHAP_HANG: {
    name: 'Nhập hàng',
  },
  XUAT_HANG: {
    name: 'Xuất hàng',
  },
  DICH_VU: {
    name: 'Dịch vụ',
  },
  KHAC: {
    name: 'Khác',
  },
};

export const LIST_ORDER_TYPE: {[key: string]: {name: string}} = {
  BUY: {
    name: 'Mua',
  },
  SELL: {
    name: 'Bán',
  },
};
