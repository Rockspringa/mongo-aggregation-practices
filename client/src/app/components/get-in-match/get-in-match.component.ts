import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals/globals.service';
import { MatchesService } from 'src/app/services/matches/matches.service';

@Component({
  selector: 'app-get-in-match',
  templateUrl: './get-in-match.component.html',
  styleUrls: ['./get-in-match.component.css'],
})
export class GetInMatchComponent implements OnInit {
  matchId: string = '';
  username: string = '';
  guestUsername: string = '';

  constructor(
    private router: Router,
    private matchesService: MatchesService,
    private globalsService: GlobalsService
  ) {}

  ngOnInit(): void {
    this.username = this.globalsService.getUser().username || '';
  }

  public addPlayerToMatch() {
    const guest = !this.router.url.includes('student');

    if (guest) {
      if (!this.guestUsername) {
        alert('Tiene que agregar un nombre de usuario provisional');
      } else {
        this.username = this.guestUsername;
      }
    }

    this.matchesService
      .addPlayer(this.matchId, this.username, guest)
      .subscribe({
        next: (msg) => this.router.navigate(['./', this.matchId]),
        error: (err) => (console.error(err.message), alert(err)),
      });
  }
}
