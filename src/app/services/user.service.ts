import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL: string = "";

  constructor(private http: HttpClient) {
    this.apiURL = "/user"
  }

  delete():Observable<any>{
    return this.http.delete(`${this.apiURL}/delete`);
  }

  update(name: string, email:string, password:string):Observable<any>{
    return this.http.put(`${this.apiURL}/update`, { name, email, password });
  }

}
