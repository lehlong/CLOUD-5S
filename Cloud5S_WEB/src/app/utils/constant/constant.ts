export enum FILE_TYPE {
  IMAGE = 'IMAGE',
  WORD = 'WORD',
  VIDEO = 'VIDEO',
  EXCEL = 'EXCEL',
}

export enum MODULE_TYPE {
  CHECK_IN = 'CheckIn',
  CHECK_OUT = 'CheckOut',
  ORDERS = 'Orders',
  COMMENT = 'Comment',
}

export const ORDER_STEPS = {
  CHUA_XAC_NHAN: 0,
  DA_XAC_NHAN: 1,
  DA_NHAN_DON: 2,
  DA_VAO_CONG: 3,
  DA_CAN_VAO: 4,
  DANG_GOI_XE: 5,
  DANG_XUAT_HANG: 6,
  DA_LAY_HANG: 7,
  DA_CAN_RA: 8,
  DA_HOAN_THANH: 9,
  DA_GIAO_HANG: 10,
};

export const ORDER_STEP_NAMES = {
  CHUA_XAC_NHAN: 'Chưa xác nhận',
  DA_XAC_NHAN: 'Đã xác nhận',
  DA_NHAN_DON: 'Đã nhận đơn',
  DA_VAO_CONG: 'Đã vào cổng',
  DA_CAN_VAO: 'Đã cân vào',
  DANG_GOI_XE: 'Đang gọi xe',
  DANG_XUAT_HANG: 'Đang xuất hàng',
  DA_LAY_HANG: 'Đã lấy hàng',
  DA_CAN_RA: 'Đã cân ra',
  DA_HOAN_THANH: 'Đã hoàn thành',
  DA_GIAO_HANG: 'Đã giao hàng',
};

export const ORDER_TYPE = {
  KHONG_XAC_DINH: 0,
  NHAP: 1,
  XUAT: 2,
};

export const COLOR_STEP = {
  BLACK: 'black',
  RED: 'red',
  YELLOW: 'yellow',
  BLUE: 'blue',
  GREEN: 'green',
  GRAY: 'gray',
  BROWN: 'brown',
  ORANGE: 'orange',
  PINK: 'pink',
  WHITE: 'white',
  PURPLE: 'purple',
};

export const lstStep = [
  {
    value: ORDER_STEPS.CHUA_XAC_NHAN,
    name: 'Chưa xác nhận',
    color: COLOR_STEP.BLACK,
    class: 'tag tag--draft',
    column: 'orderDate',
  },
  {
    value: ORDER_STEPS.DA_XAC_NHAN,
    name: 'Đã xác nhận',
    color: COLOR_STEP.GRAY,
    class: 'tag tag--pending',
    column: 'timeConfirm1',
  },
  {
    value: ORDER_STEPS.DA_NHAN_DON,
    name: 'Đã nhận đơn',
    color: COLOR_STEP.BLUE,
    class: 'tag tag--inprogress',
    column: 'timeConfirm2',
  },
  {
    value: ORDER_STEPS.DA_VAO_CONG,
    name: 'Đã vào cổng',
    color: COLOR_STEP.ORANGE,
    class: 'tag tag--inprogress',
    column: 'timeConfirm3',
  },
  {
    value: ORDER_STEPS.DA_CAN_VAO,
    name: 'Chờ lấy hàng',
    color: COLOR_STEP.PINK,
    class: 'tag tag--inprogress',
    column: 'timeConfirm4',
  },
  {
    value: ORDER_STEPS.DANG_GOI_XE,
    name: 'Đang gọi xe',
    color: COLOR_STEP.PURPLE,
    class: 'tag tag--inprogress',
    column: 'timeConfirm5',
  },
  {
    value: ORDER_STEPS.DANG_XUAT_HANG,
    name: 'Đang xuất hàng',
    color: COLOR_STEP.YELLOW,
    class: 'tag tag--inprogress',
    column: 'timeConfirm6',
  },
  {
    value: ORDER_STEPS.DA_LAY_HANG,
    name: 'Đã lấy hàng',
    color: COLOR_STEP.PINK,
    class: 'tag tag--inprogress',
    column: 'timeConfirm7',
  },
  {
    value: ORDER_STEPS.DA_CAN_RA,
    name: 'Đã cân ra',
    color: COLOR_STEP.PINK,
    class: 'tag tag--inprogress',
    column: 'timeConfirm8',
  },
  {
    value: ORDER_STEPS.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
    color: COLOR_STEP.GREEN,
    class: 'tag tag--done',
    column: 'timeConfirm9',
  },
  {
    value: ORDER_STEPS.DA_GIAO_HANG,
    name: 'Đã giao hàng',
    color: COLOR_STEP.GREEN,
    class: 'tag tag--done',
    column: 'timeConfirm10',
  },
];

export const lstStepTracking = [
  {
    value: ORDER_STEPS.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
    color: COLOR_STEP.GREEN,
    class: 'tag tag--done',
    column: 'timeConfirm9',
  },
  {
    value: ORDER_STEPS.DA_GIAO_HANG,
    name: 'Đã giao hàng',
    color: COLOR_STEP.GREEN,
    class: 'tag tag--done',
    column: 'timeConfirm10',
  },
];

export const lstStepWS = [
  {
    value: ORDER_STEPS.DA_CAN_VAO,
    name: 'Đã cân vào',
  },
  {
    value: ORDER_STEPS.DANG_GOI_XE,
    name: 'Đang gọi xe',
  },
  {
    value: ORDER_STEPS.DANG_XUAT_HANG,
    name: 'Đang xuất hàng',
  },
  {
    value: ORDER_STEPS.DA_LAY_HANG,
    name: 'Đã lấy hàng',
  },
  {
    value: ORDER_STEPS.DA_CAN_RA,
    name: 'Đã cân ra',
  },
  {
    value: ORDER_STEPS.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
  },
  {
    value: ORDER_STEPS.DA_GIAO_HANG,
    name: 'Đã giao hàng',
  },
];

export const lstStepInOut1 = [
  {
    value: ORDER_STEPS.DA_NHAN_DON,
    name: 'Đã nhận đơn',
  },
  {
    value: ORDER_STEPS.DA_VAO_CONG,
    name: 'Đã vào cổng',
  },
  {
    value: ORDER_STEPS.DA_CAN_VAO,
    name: 'Đã cân vào',
  },
  {
    value: ORDER_STEPS.DANG_GOI_XE,
    name: 'Đang gọi xe',
  },
  {
    value: ORDER_STEPS.DANG_XUAT_HANG,
    name: 'Đang xuất hàng',
  },
  {
    value: ORDER_STEPS.DA_LAY_HANG,
    name: 'Đã lấy hàng',
  },
  {
    value: ORDER_STEPS.DA_CAN_RA,
    name: 'Đã cân ra',
  },
];

export const lstStepInOut2 = [
  {
    value: ORDER_STEPS.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
  },
  {
    value: ORDER_STEPS.DA_GIAO_HANG,
    name: 'Đã giao hàng',
  },
];

export const lstTypeProduct = [{name: 'PCB30'}, {name: 'PCB40'}, {name: 'ROI'}, {name: 'CLINKER'}];

export const SENSOR_CODE = {
  CODE_951_1_CB_1: '951-1-CB-1',
  CODE_951_1_CB_2: '951-1-CB-2',
  CODE_951_1_CB_3: '951-1-CB-3',
  CODE_951_1_CB_4: '951-1-CB-4',

  CODE_951_2_CB_1: '951-2-CB-1',
  CODE_951_2_CB_2: '951-2-CB-2',
  CODE_951_2_CB_3: '951-2-CB-3',
  CODE_951_2_CB_4: '951-2-CB-4',

  CODE_481_CB_1: '481-CB-1',
  CODE_481_CB_2: '481-CB-2',
  CODE_481_CB_3: '481-CB-3',
  CODE_481_CB_4: '481-CB-4',
};

export const lstStepsInOrderInformation = [
  {
    value: ORDER_STEPS.CHUA_XAC_NHAN,
    name: 'Tạo đơn lúc',
    color: COLOR_STEP.BLACK,
    column: 'orderDate',
  },
  {
    value: ORDER_STEPS.DA_XAC_NHAN,
    name: 'Đã xác nhận',
    color: COLOR_STEP.GRAY,
    column: 'timeConfirm1',
  },
  {
    value: ORDER_STEPS.DA_VAO_CONG,
    name: 'Đã vào cổng',
    color: COLOR_STEP.ORANGE,
    column: 'timeConfirm3',
  },
  {
    value: ORDER_STEPS.DA_CAN_VAO,
    name: 'Đã cân vào',
    color: COLOR_STEP.PINK,
    column: 'timeConfirm4',
  },
  {
    value: ORDER_STEPS.DA_LAY_HANG,
    name: 'Đã lấy hàng',
    color: COLOR_STEP.PINK,
    column: 'timeConfirm7',
  },
  {
    value: ORDER_STEPS.DA_CAN_RA,
    name: 'Đã cân ra',
    color: COLOR_STEP.PINK,
    column: 'timeConfirm8',
  },
  {
    value: ORDER_STEPS.DA_HOAN_THANH,
    name: 'Đã hoàn thành',
    color: COLOR_STEP.GREEN,
    column: 'timeConfirm9',
  },
  {
    value: ORDER_STEPS.DA_GIAO_HANG,
    name: 'Đã giao hàng',
    color: COLOR_STEP.GREEN,
    column: 'timeConfirm10',
  },
];

export const lstOrderType = [
  {
    value: ORDER_TYPE.XUAT,
    shortName: 'X',
    fullName: 'Xuất',
    fullNamePrint: 'Xuất Hàng',
  },
  {
    value: ORDER_TYPE.NHAP,
    shortName: 'N',
    fullName: 'Nhập',
    fullNamePrint: 'Nhập Hàng',
  },
];
