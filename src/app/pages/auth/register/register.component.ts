import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ RouterLink, FormsModule, NgIf ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService) {}

  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  errorMessageBox: boolean = false;
  sucessMessageBox: boolean = false;
  registrationSucceeded: boolean = false;
  registrationFailed: boolean = false;
  passwordMatch: boolean = true;

  onSubmit() {
    if (this.password == this.passwordConfirm){
      this.authService.register(this.name, this.email, this.password).subscribe({
        next: () => {
          this.sucessMessageBox = true;
          this.registrationSucceeded = true},
        error: () => {
          this.errorMessageBox = true;
          this.registrationFailed = true}
      });
    } else {
      this.errorMessageBox = true;
      this.passwordMatch =  false;
    }
  }

}
