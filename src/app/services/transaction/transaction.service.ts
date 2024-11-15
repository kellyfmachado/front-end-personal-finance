import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionModel } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiURL: string = "";

  constructor(private http: HttpClient) {
    this.apiURL = "/transaction"
  }

  add(transactionModel: TransactionModel):Observable<any>{
    return this.http.post(`${this.apiURL}/add`, transactionModel);
  }

  update(transactionModel: TransactionModel):Observable<any>{
    return this.http.put(`${this.apiURL}/update`, transactionModel);
  }

  delete(id: number):Observable<any>{
    return this.http.delete(`${this.apiURL}/delete/${id}`);
  }

  list(page: number = 0, size: number = 10000):Observable<any>{
    return this.http.get(`${this.apiURL}/list?page=${page}&size=${size}`);
  }

  listByCategory(id: number, page: number = 0, size: number = 10000):Observable<any>{
    return this.http.get(`${this.apiURL}/listByCategory/${id}?page=${page}&size=${size}`);
  }

}
