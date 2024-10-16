import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
@Component({
  selector: 'transaction',
  standalone: true,
  imports: [NavigationComponent, TransactionListComponent, NgIf],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  isAliveRegister: boolean = true;
  isAliveUpdate: boolean = false;

  returnRegister(event: MouseEvent) {
    this.isAliveUpdate = false;
    this.isAliveRegister = true;
  }

  update(){
    this.isAliveRegister = false;
    this.isAliveUpdate = true;
  }

}
