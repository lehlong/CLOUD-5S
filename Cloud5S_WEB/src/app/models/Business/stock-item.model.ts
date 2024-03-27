export interface StockItemModel {
  stockCode: string;
  itemCode: string;
  Amount?: string;
  note?: string;
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
