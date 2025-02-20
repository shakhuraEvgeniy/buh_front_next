export interface IReceivable {
  id: number;
  create_time: Date;
  amount_of_debt: number;
  funds_repaid: number;
  debtor: string;
  deptor_id: number;
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

export interface IAddRefund {
  createTime: Date;
  receivableId: number;
  sum: number;
  accountId: number;
  debtRepaid: boolean;
}
