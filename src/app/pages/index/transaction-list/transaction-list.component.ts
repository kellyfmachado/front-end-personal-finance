import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionModel } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';

@Component({
  selector: 'transaction-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {

  constructor(private transactionService: TransactionService){}

  @Input() transaction: TransactionModel = {id: 0, date: new Date() , amount: 0, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};

  @Output() updateTransactionEvent = new EventEmitter<TransactionModel>();
  @Output() deleteTransactionEvent = new EventEmitter<TransactionModel>();

  returnUpdate(event: MouseEvent) {
    this.updateTransactionEvent.emit(this.transaction);
  }

  deleteTransactionUpdate(event: MouseEvent){
    this.deleteTransactionEvent.emit(this.transaction);
  }

}
