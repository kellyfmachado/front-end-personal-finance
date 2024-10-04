import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {


  isAlive: boolean = false;

  public userBox () {
    this.isAlive = !this.isAlive
  }
}
