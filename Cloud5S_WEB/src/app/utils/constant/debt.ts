export const STATE_DEBT: {[key: string]: {name: string; background: string; color: string; value: string}} = {
  DA_HOAN_THANH: {
    name: 'Đã chốt',
    background: '#800080',
    color: '#ffffff',
    value: 'DA_HOAN_THANH',
  },
  DA_TRON_XONG: {
    name: 'Chưa chốt',
    background: '#0000FF',
    color: '#ffffff',
    value: 'DA_TRON_XONG',
  },
};

export const ACTION_DEBT: {[key: string]: {name: string; value: string}} = {
  TAO_MOI: {
    name: 'Tạo mới',
    value: 'TAO_MOI',
  },
  CHINH_SUA: {
    name: 'Chỉnh sửa',
    value: 'CHINH_SUA',
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
  HOAN_THANH: {
    name: 'Hoàn thành',
    value: 'HOAN_THANH',
  },
  HOAN_THANH_TRON: {
    name: 'Hoàn thành trộn',
    value: 'HOAN_THANH_TRON',
  },
  CHOT_CONG_NO: {
    name: 'Chốt công nợ',
    value: 'CHOT_CONG_NO',
  },
  HUY: {
    name: 'Huỷ',
    value: 'HUY',
  },
  TU_CHOI: {
    name: 'Từ chối',
    value: 'TU_CHOI',
  },
};

export const LIST_STATE_DEBT = [
  {
    name: 'Chưa chốt',
    value: 'DA_TRON_XONG',
  },
  {
    name: 'Đã chốt',
    value: 'DA_HOAN_THANH',
  },
];

export const DEBT_TYPE_ITEM = {
  be_tong: 'BETONG',
  sand: 'SAND',
  stone: 'STONE',
  xebom: 'XEBOM',
};
