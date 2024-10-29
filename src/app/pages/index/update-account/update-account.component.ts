import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { UserService } from '../../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [ NavigationComponent, FormsModule, NgIf ],
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent {

  constructor(private userSevice: UserService) {}

  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  errorMessageBox: boolean = false;
  successMessageBox: boolean = false;
  registrationFailed: boolean = false;
  passwordMatch: boolean = true;

  onSubmit() {
    if (this.password == this.passwordConfirm){
      this.userSevice.update(this.name, this.email, this.password).subscribe({
        next: () => {
          this.successMessageBox = true;
          this.registrationFailed = false;
          this.passwordMatch = true;
          this.errorMessageBox = false},
        error: () => {
          this.errorMessageBox = true;
          this.registrationFailed = true;
          this.successMessageBox = false;
          this.passwordMatch = true}
      });
    } else {
      this.errorMessageBox = true;
      this.passwordMatch =  false;
      this.registrationFailed = false;
      this.successMessageBox = false;
    }
  }

}
