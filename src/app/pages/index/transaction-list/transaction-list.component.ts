import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionModel } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';

@Component({
  selector: 'transaction-list',
  standalone: true,
  imports: [ ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {

  constructor(private transactionService: TransactionService){}

  @Input() transaction: TransactionModel = {id: 0, date: "" , amount: 0, type:"", description: "", categoryModel: {id: 0, name:"", amount: 0}};

  @Output() updateEvent = new EventEmitter<void>();

  returnUpdate(event: MouseEvent) {
    this.updateEvent.emit();
  }

}
