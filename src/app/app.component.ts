import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/index/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, LoginComponent, RegisterComponent, HomeComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personal-finance';
}
