export const STATE_LIST_PURCHASE_ORDERS: {
  [key: string]: {name: string; background: string; color: string; value: string};
} = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    background: '#CCCCCC',
    color: '#ffffff',
    value: 'KHOI_TAO',
  },
  DA_VAO_CONG: {
    name: 'Đã vào cổng',
    background: '#228B22',
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
  DA_RA_CONG: {
    name: 'Đã ra cổng',
    background: '#8B4513',
    color: '#ffffff',
    value: 'RA_CONG',
  },
  DA_DEN_CANG: {
    name: 'Đã đến cảng',
    background: '#FF0000',
    color: '#ffffff',
    value: 'DEN_CANG',
  },
  DA_DO_HANG: {
    name: 'Đã đổ hàng',
    background: '#800080',
    color: '#ffffff',
    value: 'DO_HANG',
  },
};

export const STATE_SHIFT: {
  [key: string]: {name: string; background: string; color: string; value: string};
} = {
  CHUA_CHOT: {
    name: 'Chưa chốt',
    background: '#228B22',
    color: '#ffffff',
    value: 'CHUA_CHOT',
  },
  DA_CHOT: {
    name: 'Đã chốt',
    background: '#800080',
    color: '#ffffff',
    value: 'DA_CHOT',
  },
};

export const LIST_PURCHASE_ORDERS_STATE = [
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
    name: 'Đã ra cổng',
    value: 'RA_CONG',
  },
  {
    name: 'Đã đến cảng',
    value: 'DEN_CANG',
  },
  {
    name: 'Đã đổ hàng',
    value: 'DO_HANG',
  },
];

export const PROCESS_TYPE: {
  [key: string]: {name: string; value: string};
} = {
  SX_TT: {
    name: 'Sản xuất trực tiếp',
    value: 'SX_TT',
  },
  HA_BAI: {
    name: 'Hạ bãi',
    value: 'HA_BAI',
  }
};

export const LIST_PROCESS_TYPE = [
  {
    name: 'Sản xuất trực tiếp',
    value: 'SX_TT',
  },
  {
    name: 'Hạ bãi',
    value: 'HA_BAI',
  }
];

export const LIST_PROCESS_TYPE_SEARCH = [
  {
    name: 'Chưa nhập tình trạng sản xuất',
    value: 'EMPTY',
  },
  {
    name: 'Sản xuất trực tiếp',
    value: 'SX_TT',
  },
  {
    name: 'Hạ bãi',
    value: 'HA_BAI',
  }
];
