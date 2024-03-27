export interface VehicleModel {
  code: string;
  tonnage?: number;
  driver?: string;
  typeCode?: string;
  unladenWeight?: number;
  isActive?: boolean | string;
  unitCode?: string;

  driverUserName?: string | null;
}
