import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  isAlive: boolean = false;

  userBox(event: MouseEvent) {
    this.isAlive = !this.isAlive;
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

