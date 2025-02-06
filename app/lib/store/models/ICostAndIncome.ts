export interface ICostAndIncome {
  id: number;
  account: string;
  sum: number;
  category: string;
  sub_category: string;
  comment: string;
  create_time: Date;
}

export interface IAddCostAndIncome {
  accountId: number;
  sum: number;
  categoryId: number;
  subCategoryId: number | null;
  comment: string;
  createTime: Date;
}
