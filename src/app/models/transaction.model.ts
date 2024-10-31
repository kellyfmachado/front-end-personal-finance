import { CategoryModel } from "./category.model";

export interface TransactionModel {
  id: number;
  date: string;
  amount: number;
  type: string;
  description: string;
  categoryModel: CategoryModel;
}
