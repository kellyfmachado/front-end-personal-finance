import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Router } from '@angular/router';
import { TransactionModel } from '../../../models/transaction.model';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
@Component({
  selector: 'transaction',
  standalone: true,
  imports: [NavigationComponent, TransactionListComponent, NgIf, NgFor],
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
  }

  update(){
    this.isAliveRegister = false;
    this.isAliveUpdate = true;
  }

  categories: CategoryModel[] = []
  transactions: TransactionModel[] = [];
  transactionModel: TransactionModel = {id: 0, date: "" , amount: 0, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};
  transactionDeleteModel: TransactionModel = {id: 0, date: "" , amount: 0, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};;

  capitalizeWords(str: string) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  listCategories(){
    this.categories = [];
    this.categoryService.list().subscribe({
      next: (response)  => {
        this.categories = response.content;

        for(let i = 0; i<this.categories.length; i++){
          this.categories[i].name = this.capitalizeWords(this.categories[i].name);
        }
      },
      error: (err) => console.log('Error deleting transaction', err)
    });
  }

  listTransactions(){
    this.transactions = [];
    this.transactionService.list(this.page, this.size).subscribe({
      next: (response)  => {
        this.transactions = response.content;
        this.totalPages = response.totalPages;

        for(let i = 0; i<this.transactions.length; i++){
          this.transactions[i].type = this.capitalizeWords(this.transactions[i].type);
          this.transactions[i].description = this.capitalizeWords(this.transactions[i].description);
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
      error: (err) => console.log('Error deleting transaction', err)
    });
  }

}
