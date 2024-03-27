export interface STATE_STOCK_CONST {
  [key: string]: {name: string; background: string; color: string; value: string};
}
export const STATE_STOCK: STATE_STOCK_CONST = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    background: '#CCCCCC',
    color: '#ffffff',
    value: 'KHOI_TAO',
  },
  DA_TRON_XONG: {
    name: 'Đã trộn xong',
    background: '#0000FF',
    color: '#ffffff',
    value: 'DA_TRON_XONG',
  },
  DA_XAC_NHAN: {
    name: 'Đã xác nhận',
    background: '#228B22',
    color: '#ffffff',
    value: 'DA_XAC_NHAN',
  },
  DA_BI_HUY: {
    name: 'Đã hủy',
    background: '#ff0000',
    color: '#ffffff',
    value: 'DA_BI_HUY',
  },
};

export const ACTION_STOCK: {[key: string]: {name: string; value: string}} = {
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
  HOAN_THANH_TRON: {
    name: 'Hoàn thành trộn',
    value: 'HOAN_THANH_TRON',
  },
};
