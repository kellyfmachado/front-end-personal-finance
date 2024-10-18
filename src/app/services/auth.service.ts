import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL: string = "";

  constructor(private http: HttpClient, private route:Router) {
    this.apiURL = "http://localhost:8080/auth"
  }

  login(email:string, password:string):Observable<any>{
    return this.http.post(`${this.apiURL}/login`, { email, password }).pipe(
      tap((response: any) => {
        this.setToken(response.token);
      })
    );
  }

  logout() {
    this.removeToken();
    this.route.navigate(['/login']);
  }

  private setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  private removeToken() {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
