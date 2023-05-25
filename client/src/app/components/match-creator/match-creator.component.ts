import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals/globals.service';
import { MatchesService } from 'src/app/services/matches/matches.service';

@Component({
  selector: 'app-match-creator',
  templateUrl: './match-creator.component.html',
  styleUrls: ['./match-creator.component.css'],
})
export class MatchCreatorComponent {
  games = [
    'crucigrama',
    'sopa de letras',
    'palabras mezcladas',
    'intriga mental',
  ];
  selectedGame: string = '';
  state: any = {};

  constructor(
    private router: Router,
    private matchesService: MatchesService,
    private globalsService: GlobalsService
  ) {}

  public createMatch() {
    const user = this.globalsService.getUser();
    console.log(user);
    this.matchesService
      .createMatch(this.selectedGame, user.username, this.state ?? {})
      .subscribe({
        next: (match) => {
          alert(
            `Se creo el juego con exito.\nEl codigo del juego es ${match._id}`
          );

          this.router
            .navigateByUrl('/profesor')
            .then(() => this.router.navigateByUrl('/profesor/crear-sala'));
        },
        error: console.error,
      });
  }
}
