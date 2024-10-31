import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiURL: string = "";

  constructor(private http: HttpClient) { 
    this.apiURL = "/transaction"
  }

  list():Observable<any>{
    return this.http.get(`${this.apiURL}/list`);
  }

}
