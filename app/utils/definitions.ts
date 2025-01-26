export type Account = {
  id: number;
  name: string;
  start_sum: string;
  current_sum: string;
  comment: string;
};

export type Accounts = {
  accounts: Account[];
  sum: string;
};

export type CostAndIncome = {
  id: number;
  account: string;
  sum: string;
  category: string;
  sub_category: string;
  comment: string;
  create_time: Date;
};

export type Category = {
  id: number;
  name: string;
};

export type SubCategories = {
  id: number;
  name: string;
  category_id: number;
};

export type Item = 'cost' | 'income' | 'account';

export type ItemReports = {
  category: string;
  sum: string;
};

export type Report = {
  categorys: ItemReports[];
  sum: string;
};

export type Receivables = {
  id: number;
  create_time: Date;
  amount_of_debt: string;
  funds_repaid: string;
  debtor: string;
  account: string;
  debt_repaid: boolean;
};
