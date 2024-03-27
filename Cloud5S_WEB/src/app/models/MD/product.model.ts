export interface ProductModel {
  code: string;
  name: string;
  isActive?: boolean;
  isManufacture?: boolean;
  unitCode?: string;
  typeCode: string;
  costPrice: string | number;
  sellPrice: string | number;
  itemFormula?: null;
}
