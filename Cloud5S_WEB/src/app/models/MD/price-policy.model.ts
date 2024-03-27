export interface PricePolicyModel {
    id?: string;
    areaCode: string;
    itemCode?: string;
    fromDate?: string;
    toDate?: string;
    price?: number ;
    note?: string;
  }
  export interface optionsGroup {
    id: string;
    name: string;
  }