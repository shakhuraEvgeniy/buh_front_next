export interface IReceivable {
  id: number;
  create_time: Date;
  amount_of_debt: number;
  funds_repaid: number;
  debtor: string;
  account: string;
  debt_repaid: boolean;
}

export interface IRefund {
  id: number;
  create_time: Date;
  receivable_id: number;
  sum: number;
  account_id: number;
  account: string;
}
