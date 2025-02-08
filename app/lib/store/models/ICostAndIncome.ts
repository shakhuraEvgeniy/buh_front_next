export interface ICostAndIncome {
  id: number;
  account: string;
  sum: number;
  category: string;
  sub_category: string;
  comment: string;
  create_time: Date;
  accountid: number;
  categoryid: number;
  subcategoryid: number | null;
}

export interface IAddCostAndIncome {
  accountId: number;
  sum: number;
  categoryId: number;
  subCategoryId: number | null;
  comment: string;
  createTime: Date;
}

export interface IUpdateCost {
  costId: number;
  accountId: number;
  sum: number;
  categoryId: number;
  subCategoryId: number | null;
  comment: string;
  createTime: Date;
}
