import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL: string = "";

  constructor(private http: HttpClient) {
    this.apiURL = "/category"
  }

  list():Observable<any>{
    return this.http.get(`${this.apiURL}/list`);
  }

}
