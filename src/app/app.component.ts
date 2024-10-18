import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/index/home/home.component';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ {provide: HTTP_INTERCEPTORS, useValue:authInterceptor, multi: true} ],
  imports: [ RouterOutlet, LoginComponent, RegisterComponent, HomeComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personal-finance';
}
