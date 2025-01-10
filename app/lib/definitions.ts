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
