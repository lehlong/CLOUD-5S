export interface STATE_CONTRACT_CONST {
  [key: string]: {name: string; background: string; color: string; value: string};
}
export const STATE_CONTRACT: STATE_CONTRACT_CONST = {
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
    name: 'Đã hủy',
    background: '#ff0000',
    color: '#ffffff',
    value: 'DA_BI_HUY',
  },
};

export const STATE_TYPE_CONTRACT: {[key: string]: {name: string; value: string}} = {
  MUA: {
    name: 'Hợp đồng mua',
    value: 'MUA',
  },
  BAN: {
    name: 'Hợp đồng bán',
    value: 'BAN',
  },
};
