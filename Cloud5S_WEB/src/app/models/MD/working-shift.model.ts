  export interface WorkingShiftModel {
    id?:string;
    code?: string;
    name?: string;
    fromDate?: string;
    toDate?: string;
    note?: string;
    ordinalNumber?: number;
    isActive?: boolean | string;
  }
  export interface optionsGroup {
    id: string;
    name: string;
  }
  