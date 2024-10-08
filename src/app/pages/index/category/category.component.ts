import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: 'category',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
