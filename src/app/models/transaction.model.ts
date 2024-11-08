import { CategoryModel } from "./category.model";

export interface TransactionModel {
  id: number;
  date: Date;
  amount: number | null;
  type: string;
  description: string;
  categoryModel: CategoryModel;
}
