import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent {
  constructor(private router: Router) {}

  comenzarJuego() {
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    if (username.trim() !== '') {
      this.router.navigate(['/inicio']);
    }
  }

}
