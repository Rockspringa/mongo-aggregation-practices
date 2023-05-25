import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchesService } from './../services/matches.service';
import { GameSopaComponent } from './../game-sopa/game-sopa.component';

@Component({
  selector: 'app-game-two',
  templateUrl: './game-two.component.html',
  styleUrls: ['./game-two.component.css']
})

export class GameTwoComponent {
  matchForm: FormGroup;
  codigoIncorrecto = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  //  private gameSopaComponent: GameSopaComponent,
    private matchService: MatchesService
  ) {
    this.matchForm = this.formBuilder.group({
      codigo: ['', Validators.required]
    });
  }

  comenzarJuego() {
    if (this.matchForm.invalid) {
      return;
    }

    const gameCode = this.matchForm.value.codigo;
    this.matchService.getMatchById(gameCode).subscribe(
      response => {
        if (response) {
        //  this.gameSopaComponent.wordsToFind = response.state; // Almacenar las palabras encontradas en el componente GameSopaComponent
          this.router.navigate(['/playsopa']);
        }
      },
      error => {
        this.codigoIncorrecto = true;
        console.error('Error al verificar el código de juego', error);
      }
    );
  }
}
