export interface IAccount {
  id: number;
  name: string;
  current_sum: number;
  comment: string;
}

export interface IAccounts {
  accounts: IAccount[];
  sum: number;
}

export type IAccountSort = 'contribution' | 'notContribution' | 'all';

export interface IAccountFilters {
  name: IAccountSort;
  value: 'Вклады' | 'Счета' | 'Все';
}
