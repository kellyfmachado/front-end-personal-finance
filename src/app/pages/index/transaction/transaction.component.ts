import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Router } from '@angular/router';
import { TransactionModel } from '../../../models/transaction.model';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'transaction',
  standalone: true,
  imports: [NavigationComponent, TransactionListComponent, NgIf, NgFor, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  constructor(private transactionService: TransactionService, private categoryService: CategoryService, private router: Router){
  }

  ngOnInit(){
    this.listTransactions();
    this.listCategories();
  }

  errorMessageBox: boolean = false;
  registrationFailed: boolean = false;
  completeFields: boolean = false;

  isAliveRegister: boolean = true;
  isAliveUpdate: boolean = false;
  isAlivePrevious: boolean = false;
  isAliveNext: boolean = false;
  deleteArea: boolean = false;
  page: number = 0;
  size: number = 3;
  totalPages: number = 0;

  returnRegister(event: MouseEvent) {
    this.isAliveUpdate = false;
    this.isAliveRegister = true;
    this.transactionModel = {id: 0, date: new Date() , amount: null, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};
    this.listTransactions();
  }

  update(transaction: TransactionModel){
    this.isAliveRegister = false;
    this.isAliveUpdate = true;
    this.errorMessageBox = false;
    this.registrationFailed = false;
    this.completeFields = false;
    this.transactionModel = transaction;
    if(!this.categoryOption){
      this.listTransactions();
    } else {
      this.listTransactionsByCategory();
    }
  }

  deleteBoxOn(transaction: TransactionModel) {
    this.transactionDeleteModel = transaction;
    this.deleteArea = true;
  }

  deleteBoxOff(event: MouseEvent) {
    this.deleteArea = false;
  }

  listAll(event: MouseEvent){
    this.page = 0;
    this.categoryOption = 0;
    this.listTransactions();
  }

  listByCategory(event: Event){
    this.page = 0;
    this.listTransactionsByCategory();
  }

  nextCategories(event: MouseEvent){
    this.page = this.page+1;
    if(!this.categoryOption){
      this.listTransactions();
    } else {
      this.listTransactionsByCategory();
    }
  }

  previousCategories(event: MouseEvent){
    this.page = this.page-1;
    if(!this.categoryOption){
      this.listTransactions();
    } else {
      this.listTransactionsByCategory();
    }
  }

  public isAliveTransactions: boolean = false;

  categories: CategoryModel[] = [];
  categoryOption: number = 0;
  categoryRegisterOption: number = 0;
  typeOption: number = 0;
  typeOptions: string[] = ["deposit", "withdraw"];
  transactions: TransactionModel[] = [];
  transactionModel: TransactionModel = {id: 0, date: new Date(), amount: null, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};
  transactionDeleteModel: TransactionModel = {id: 0, date: new Date() , amount: null, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};;

  capitalizeWords(str: string) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  capitalizeFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  listCategories(){
    this.categories = [];
    this.categoryService.list().subscribe({
      next: (response)  => {
        this.categories = response.content.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);;

        for(let i = 0; i<this.categories.length; i++){
          this.categories[i].name = this.capitalizeFirst(this.categories[i].name);
        }
      },
      error: (err) => console.log('Error listing categories', err)
    });
  }

  listTransactions(){
    this.transactions = [];
    this.transactionService.list(this.page, this.size).subscribe({
      next: (response)  => {
        this.transactions = response.content.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        this.totalPages = response.totalPages;

        for(let i = 0; i<this.transactions.length; i++){
          this.transactions[i].type = this.capitalizeFirst(this.transactions[i].type);
          this.transactions[i].description = this.capitalizeFirst(this.transactions[i].description);
          this.transactions[i].categoryModel.name = this.capitalizeWords(this.transactions[i].categoryModel.name);
        }

        if(this.page+1==this.totalPages){
          this.isAliveNext = false;
        } else {
          this.isAliveNext = true;
        }

        if(this.page+1==1){
          this.isAlivePrevious = false;
        } else {
          this.isAlivePrevious = true;
        }

        if(this.transactions.length!=0){
          this.isAliveTransactions = true;
        }
        else {
          this.isAliveTransactions = false;
        }

      },
      error: (err) => console.log('Error listing transactions', err)
    });
  }

  listTransactionsByCategory(){
    this.transactions = [];
    this.transactionService.listByCategory(this.categories[this.categoryOption-1].id, this.page, this.size).subscribe({
      next: (response)  => {
        this.transactions = response.content.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        this.totalPages = response.totalPages;

        for(let i = 0; i<this.transactions.length; i++){
          this.transactions[i].type = this.capitalizeFirst(this.transactions[i].type);
          this.transactions[i].description = this.capitalizeFirst(this.transactions[i].description);
          this.transactions[i].categoryModel.name = this.capitalizeWords(this.transactions[i].categoryModel.name);
        }

        if(this.page+1==this.totalPages){
          this.isAliveNext = false;
        } else {
          this.isAliveNext = true;
        }

        if(this.page+1==1){
          this.isAlivePrevious = false;
        } else {
          this.isAlivePrevious = true;
        }

      },
      error: (err) => console.log('Error listing transactions by category', err)
    });
  }

  addTransaction(){
    this.transactionService.add(this.transactionModel).subscribe({
      next: () => {
        this.listTransactions();
        this.errorMessageBox = false;
        this.registrationFailed = false;
        this.transactionModel = {id: 0, date: new Date(), amount: null, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};
      },
      error: (err) => {
        this.errorMessageBox = true;
        this.registrationFailed = true;
        console.log('Error adding transaction', err)
      }
    });
  }

  updateTransaction(){
    this.transactionService.update(this.transactionModel).subscribe({
      next: ()  => {
        this.listTransactions();
        this.transactionModel = {id: 0, date: new Date(), amount: null, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};
      },
      error: (err) => console.log('Error updating transaction', err)
    });
  }

  deleteTransaction(){
    this.transactionService.delete(this.transactionDeleteModel.id).subscribe({
      next: () => {
        this.deleteArea = false;
        window.location.reload();
      },
      error: (err) => console.log('Error deleting transaction', err)
    });
  }

  register(){
    if(this.categoryRegisterOption!=0){
      this.transactionModel.categoryModel = this.categories[this.categoryRegisterOption-1];
    }
    if(this.typeOption!=0){
      this.transactionModel.type = this.typeOptions[this.typeOption-1];
    }
    this.transactionModel.date = new Date();
    if(this.isAliveRegister){
      if(!this.transactionModel.amount || !this.typeOption || !this.categoryRegisterOption || !this.transactionModel.description){
        this.errorMessageBox = true;
        this.completeFields = true;
      }
      else {
        this.errorMessageBox = false;
        this.completeFields = false;
        this.addTransaction();
      }
    } else{
      this.updateTransaction();
    }
    this.categoryOption = 0;
  }

}
