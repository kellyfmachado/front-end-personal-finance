import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL: string = "";

  constructor(private http: HttpClient) {
    this.apiURL = "/category"
  }

  add(name: string):Observable<any>{
    return this.http.post(`${this.apiURL}/add`, {name});
  }

  update(categoryModel: CategoryModel):Observable<any>{
    return this.http.put(`${this.apiURL}/update`, categoryModel);
  }

  delete(id: number):Observable<any>{
    return this.http.delete(`${this.apiURL}/delete/${id}`);
  }

  list(page: number = 0, size: number = 18):Observable<any>{
    return this.http.get(`${this.apiURL}/list?page=${page}&size=${size}`);
  }

}
