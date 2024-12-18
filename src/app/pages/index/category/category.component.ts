import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryModel } from '../../../models/category.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'category',
  standalone: true,
  imports: [NavigationComponent, CategoryListComponent, NgIf, NgFor, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private categoryService: CategoryService, private router: Router){
  }

  ngOnInit(){
    this.listCategories();
    this.listAllCategories();
  }

  errorMessageBox: boolean = false;
  registrationFailed: boolean = false;
  registerLimit: boolean = false;

  isAliveRegister: boolean = true;
  isAliveUpdate: boolean = false;
  isAlivePrevious: boolean = false;
  isAliveNext: boolean = false;
  deleteArea: boolean = false;
  page: number = 0;
  size: number = 9;
  totalPages: number = 0;

  returnRegister(event: MouseEvent) {
    this.isAliveUpdate = false;
    this.isAliveRegister = true;
    this.categoryModel = {id: 0, name:"", amount: 0};
    this.listCategories();
  }

  update(category: CategoryModel){
    this.isAliveRegister = false;
    this.isAliveUpdate = true;
    this.errorMessageBox = false;
    this.registrationFailed = false;
    this.registerLimit = false;
    this.categoryModel = category;
    this.listCategories();
  }

  deleteBoxOn(category: CategoryModel) {
    this.categoryDeleteModel = category;
    this.deleteArea = true;
  }

  deleteBoxOff(event: MouseEvent) {
    this.deleteArea = false;
  }

  nextCategories(event: MouseEvent){
    this.page = this.page+1;
    this.listCategories();
  }

  previousCategories(event: MouseEvent){
    this.page = this.page-1;
    this.listCategories();
  }

  public isAliveCategories: boolean = false;

  categories: CategoryModel[] = [];
  allCategories: CategoryModel[] = [];
  categoryRowOne: CategoryModel[] = [];
  categoryRowTwo: CategoryModel[] = [];
  categoryRowThree: CategoryModel[] = [];
  categoryModel: CategoryModel = {id: 0, name:"", amount: 0};
  categoryDeleteModel: CategoryModel = {id: 0, name:"", amount: 0};

  capitalizeFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  addCategory(){
    this.categoryService.add(this.categoryModel.name).subscribe({
      next: () => {
        this.errorMessageBox = false;
        this.registrationFailed = false;
        this.listCategories();
        this.listAllCategories();
        this.categoryModel = {id: 0, name:"", amount: 0};
      },
      error: (err) => {
        this.errorMessageBox = true;
        this.registrationFailed = true;
        console.log('Error adding category', err)
      }
    });
  }

  updateCategory(){
    this.categoryService.update(this.categoryModel).subscribe({
      next: ()  => {
        this.listCategories();
        this.categoryModel = {id: 0, name:"", amount: 0};
      },
      error: (err) => console.log('Error updating category', err)
    });
  }

  deleteCategory(){
    this.categoryService.delete(this.categoryDeleteModel.id).subscribe({
      next: () => {
        this.deleteArea = false;
        window.location.reload();
      },
      error: (err) => console.log('Error deleting category', err)
    });
  }

  onSubmit(){
    if(this.isAliveRegister){
      if(this.allCategories.length<18){
        this.errorMessageBox = false;
        this.registerLimit = false;
        this.addCategory();
      }
      else {
        this.errorMessageBox = true;
        this.registerLimit = true;
      }
    } else{
      this.updateCategory();
    }
  }

  listCategories(){
    this.categories = [];
    this.categoryRowOne = [];
    this.categoryRowTwo = [];
    this.categoryRowThree = [];
    this.categoryService.list(this.page, this.size).subscribe({
      next: (response)  => {
        this.categories = response.content.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        this.totalPages = response.totalPages;

        if(this.page+1==this.totalPages){
          this.isAliveNext = false;
        } else {
          this.isAliveNext = true;
        }

        if(this.page+1==1){
          this.isAlivePrevious = false;
        } else {
          this.isAlivePrevious = true;
        }

        for(let i = 0; i<this.categories.length; i++){
          if (i<3) {
            this.categoryRowOne[i] = this.categories[i];
            this.categoryRowOne[i].name = this.capitalizeFirst(this.categoryRowOne[i].name);
          }
          else if (i>=3 && i<6) {
            this.categoryRowTwo[i-3] = this.categories[i];
            this.categoryRowTwo[i-3].name = this.capitalizeFirst(this.categoryRowTwo[i-3].name);
          }
          else if (i>=6 && i<9) {
            this.categoryRowThree[i-6] = this.categories[i];
            this.categoryRowThree[i-6].name = this.capitalizeFirst(this.categoryRowThree[i-6].name);
          }
        }

        if(this.categories.length!=0){
          this.isAliveCategories = true;
        }
        else {
          this.isAliveCategories = false;
        }

      },
      error: (err) => console.log('Error listing categories', err)
    });
  }

  listAllCategories(){
    this.allCategories = [];
    this.categoryService.list().subscribe({
      next: (response)  => {
        this.allCategories = response.content.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);

        for(let i = 0; i<this.allCategories.length; i++){
          this.allCategories[i].name = this.capitalizeFirst(this.categories[i].name);
        }
      },
      error: (err) => console.log('Error listing categories', err)
    });
  }

}
