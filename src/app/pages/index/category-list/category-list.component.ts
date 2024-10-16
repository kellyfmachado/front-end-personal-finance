import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  @Output() updateEvent = new EventEmitter<void>();

  returnUpdate(event: MouseEvent) {
    this.updateEvent.emit();
  }

}
