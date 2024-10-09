import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { TransactionListComponent } from '../transaction-list/transaction-list.component';

@Component({
  selector: 'transaction',
  standalone: true,
  imports: [NavigationComponent, TransactionListComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

}
