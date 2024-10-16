import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [ NgIf, RouterLink ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  isAlive: boolean = false;

  userBox(event: MouseEvent) {
    this.isAlive = !this.isAlive;
  }

}

