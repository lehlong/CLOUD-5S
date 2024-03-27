export class TreeNode {
  id!: string;
  name!: string;
  pId!: string;
  rightId!: string;
  orderNumber!: number;
  url!: string;
  icon!: string;
  children!: TreeNode[];
  type!: string;
  businessCode! : string;
}

export class TreeFlatNode {
  id!: string;
  name!: string;
  pId!: string;
  rightId!: string;
  orderNumber!: number;
  url!: string;
  icon!: string;
  level!: number;
  expandable!: boolean;
  type!: string;
  businessCode!: string;
}
