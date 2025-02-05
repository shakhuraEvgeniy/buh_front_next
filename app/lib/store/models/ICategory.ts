export interface ICategory {
  id: number;
  name: string;
}

export interface ISubCategory {
  id: number;
  name: string;
  category_id: number;
}
