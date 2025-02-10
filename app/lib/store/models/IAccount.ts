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
