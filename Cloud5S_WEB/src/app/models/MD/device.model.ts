export interface DeviceModel {
  code: string;
  name?: string;
  typeCode?: string;
  groupCode?: string;
  ipAddress?: string;
  ipPort?: number;
  devicePort?: number;
  username?: string;
  password?: string;
  isActive?: boolean;
}
