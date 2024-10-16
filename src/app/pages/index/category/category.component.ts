import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'category',
  standalone: true,
  imports: [NavigationComponent, CategoryListComponent, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

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
