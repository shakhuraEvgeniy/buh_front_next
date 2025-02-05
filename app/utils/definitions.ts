export type CostAndIncome = {
  id: number;
  account: string;
  sum: number;
  category: string;
  sub_category: string;
  comment: string;
  create_time: Date;
};

export type Item = 'cost' | 'income' | 'account';

export type ItemReports = {
  category: string;
  sum: number;
};

export type Report = {
  categorys: ItemReports[];
  sum: string;
};

export type Receivables = {
  id: number;
  create_time: Date;
  amount_of_debt: number;
  funds_repaid: number;
  debtor: string;
  account: string;
  debt_repaid: boolean;
};
