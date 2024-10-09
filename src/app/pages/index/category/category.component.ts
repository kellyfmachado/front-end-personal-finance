import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'category',
  standalone: true,
  imports: [NavigationComponent, CategoryListComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
