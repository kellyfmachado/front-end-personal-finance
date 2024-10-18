import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from '../../../interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'login',
  standalone: true,
  providers: [ {provide: HTTP_INTERCEPTORS, useValue:authInterceptor, multi: true} ],
  imports: [ RouterLink, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error('Login failed', err)
    });
  }

}
