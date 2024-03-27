import {COLOR_STEP} from './constant';

export const EORDER_RELEASE_STEPS = {
  KHOI_TAO: 'KHOI_TAO',
  DA_HOAN_THANH: 'DA_HOAN_THANH',
  DA_BI_HUY: 'DA_BI_HUY',
  DA_GIAO_HANG: 'DA_GIAO_HANG',
};

export const ORDER_RELEASE_STATES = [
  {
    name: 'Đã hoàn thành',
    value: EORDER_RELEASE_STEPS.DA_HOAN_THANH,
    color: COLOR_STEP.GREEN,
  },
  {
    name: 'Đã bị huỷ',
    value: EORDER_RELEASE_STEPS.DA_BI_HUY,
    color: COLOR_STEP.RED,
  },
  {
    name: 'Đã giao hàng',
    value: EORDER_RELEASE_STEPS.DA_GIAO_HANG,
    color: COLOR_STEP.PURPLE,
  },
];

export const LIST_ORDER_RELEASE: {[key: string]: {name: string; value: string; color: string; background: string}} = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    value: EORDER_RELEASE_STEPS.KHOI_TAO,
    color: '#ffffff',
    background: '#CCCCCC',
  },
  DA_HOAN_THANH: {
    name: 'Đã hoàn thành',
    value: EORDER_RELEASE_STEPS.DA_HOAN_THANH,
    color: '#ffffff',
    background: '#800080',
  },
  DA_BI_HUY: {
    name: 'Đã bị hủy',
    value: EORDER_RELEASE_STEPS.DA_BI_HUY,
    color: '#ffffff',
    background: '#FF0000',
  },
  DA_GIAO_HANG: {
    name: 'Đã giao hàng',
    value: EORDER_RELEASE_STEPS.DA_GIAO_HANG,
    color: '#ffffff',
    background: '#0000FF',
  },
};

export const ACTION_ORDER_RELEASE: {[key: string]: {name: string; value: string}} = {
  TAO_MOI: {
    name: 'Tạo mới',
    value: 'TAO_MOI',
  },
  CAN_HANG: {
    name: 'Cân hàng',
    value: 'CAN_HANG',
  },
  HOAN_THANH: {
    name: 'Hoàn thành',
    value: 'HOAN_THANH',
  },
  HUY: {
    name: 'Huỷ',
    value: 'HUY',
  },
};

export const OR_STATE_FILTER = [
  {value: 'DA_XAC_NHAN', name: 'Đã xác nhận'},
  {value: 'DANG_XUAT_HANG', name: 'Đang xuất hàng'},
  {value: 'DA_TRON_XONG', name: 'Đã trộn xong'},
  {value: 'DA_HOAN_THANH', name: 'Đã hoàn thành'},
];
