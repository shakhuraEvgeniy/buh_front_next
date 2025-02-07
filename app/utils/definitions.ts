export type Item = 'cost' | 'income' | 'account';

export type ItemReports = {
  category: string;
  sum: number;
};

export type Report = {
  categorys: ItemReports[];
  sum: string;
};
