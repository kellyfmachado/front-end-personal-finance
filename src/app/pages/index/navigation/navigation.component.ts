import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [ NgIf, RouterLink ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  userArea: boolean = false;
  deleteArea: boolean = false;

  userBox(event: MouseEvent) {
    this.userArea = !this.userArea;
  }

  deleteBoxOn(event: MouseEvent) {
    this.deleteArea = true;
  }

  deleteBoxOff(event: MouseEvent) {
    this.deleteArea = false;
  }

  logout(event: MouseEvent){
    this.authService.logout();
  }

  deleteAccount(event: MouseEvent) {
    this.userService.delete().subscribe({
      next: ()  => this.router.navigate(['/login']),
      error: (err) => console.log('Error deleting account', err)
    });
  }

}

