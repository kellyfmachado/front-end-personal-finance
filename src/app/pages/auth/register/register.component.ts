import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
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
  successMessageBox: boolean = false;
  registrationFailed: boolean = false;
  passwordMatch: boolean = true;
  completeFields: boolean = false;

  onSubmit() {
    if (!this.name || !this.email || !this.password){

      this.errorMessageBox = true;
      this.completeFields = true;
      this.passwordMatch =  true;
      this.registrationFailed = false;
      this.successMessageBox = false;

    } else {

      if (this.password == this.passwordConfirm){
        this.authService.register(this.name, this.email, this.password).subscribe({
          next: () => {
            this.successMessageBox = true;
            this.registrationFailed = false;
            this.passwordMatch = true;
            this.errorMessageBox = false;
            this.completeFields = false},
          error: () => {
            this.errorMessageBox = true;
            this.registrationFailed = true;
            this.successMessageBox = false;
            this.passwordMatch = true;
            this.completeFields = false}
        });
      } else {
        this.errorMessageBox = true;
        this.passwordMatch =  false;
        this.registrationFailed = false;
        this.successMessageBox = false;
        this.completeFields = false;
      }

    }

  }

}


