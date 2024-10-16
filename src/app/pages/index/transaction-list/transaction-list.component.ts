import { Component, EventEmitter, Output } from '@angular/core';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'transaction-list',
  standalone: true,
  imports: [ TransactionComponent ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {

  @Output() updateEvent = new EventEmitter<void>();

  returnUpdate(event: MouseEvent) {
    this.updateEvent.emit();
  }

}
