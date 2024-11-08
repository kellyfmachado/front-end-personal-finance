import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [ ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  constructor(private categoryService: CategoryService){}

  @Input() category: CategoryModel = { id:0, name: "", amount:0 } ;

  @Output() updateCategoryEvent = new EventEmitter<CategoryModel>();
  @Output() deleteCategoryEvent = new EventEmitter<CategoryModel>();

  returnUpdate(event: MouseEvent) {
    this.updateCategoryEvent.emit(this.category);
  }

  deleteCategoryUpdate(event: MouseEvent){
    this.deleteCategoryEvent.emit(this.category);
  }

}
