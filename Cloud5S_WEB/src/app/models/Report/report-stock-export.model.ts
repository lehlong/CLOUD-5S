export interface ReportStockExportModel {
  stockCode: string;
  itemCode: string;
  Amount?: string;
  note?: string;
  orderDetails?: orderDetails[];
  orderReleases?: OrderReleaseModel[];
  item: {
    code: string;
    name: string;
    unitCode: string;
    typeCode: string;
    costPrice: string;
    sellPrice: string;
    isMainObject: boolean;
    isQuantitative: boolean;
    itemFormula: {
      itemCode: string;
      cement: string;
      stone: string;
      sand: string;
      admixture: string;
      water: string;
    };
  };
  itemType: {
    code: string;
    name: string;
    isActive: true;
  };

  stock: {
    code: string;
    name: string;
    isActive: boolean;
  };
}
export interface orderDetails {
  id?: string;
  orderCode?: string;
  itemCode: string;
  isMainItem: boolean;
  orderNumber: number;
  sandCode?: string;
  stoneCode?: string;
}

export interface OrderReleaseModel {
  id?: string;
  timeWeight1?: string;
  timeWeight2?: string;
  amount?: number;
}
