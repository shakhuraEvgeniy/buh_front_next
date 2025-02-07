export interface IItemReports {
  category: string;
  sum: number;
}

export interface IReport {
  categorys: IItemReports[];
  sum: number;
}

export interface IPeriod {
  startDate: Date;
  stopDate: Date;
}
