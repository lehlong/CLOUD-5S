export const PLAN_MANAGEMENT = [
  {value: 'DA_XAC_NHAN', name: 'Đã xác nhận'},
  {value: 'DANG_XUAT_HANG', name: 'Đang xuất hàng'},
];

export const VALUE_RADIO_OP = {
  AFTER_TWO_HOURS: 'AFTER_TWO_HOURS',
  NOW: 'NOW',
  TOMORROW: 'TOMORROW',
  AFTER_THREE_DAYS: 'AFTER_THREE_DAYS',
  THIS_WEEK: 'THIS_WEEK',
};

export const listRadioOption = [
  {
    name: '2 giờ sau',
    value: VALUE_RADIO_OP.AFTER_TWO_HOURS,
  },
  {
    name: 'Hôm nay',
    value: VALUE_RADIO_OP.NOW,
  },
  {
    name: 'Ngày mai',
    value: VALUE_RADIO_OP.TOMORROW,
  },
  {
    name: '3 ngày sau',
    value: VALUE_RADIO_OP.AFTER_THREE_DAYS,
  },
  {
    name: 'Tuần này',
    value: VALUE_RADIO_OP.THIS_WEEK,
  },
];

export const LIST_STATE_PLAN = [
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
