import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  guest: boolean = false;

  constructor(
    private router: Router,
    private matchesService: MatchesService,
    private globalsService: GlobalsService
  ) {}

  ngOnInit(): void {
    this.username = this.globalsService.getUser().username || '';

    this.guest = !this.router.url.includes('estudiante');
  }

  public addPlayerToMatch() {
    if (this.guest) {
      if (!this.guestUsername) {
        alert('Tiene que agregar un nombre de usuario provisional');
      } else {
        this.username = this.guestUsername;
        this.globalsService.addUser(this.username);
      }
    }

    this.matchesService
      .addPlayer(this.matchId, this.username, this.guest)
      .subscribe({
        next: () =>
          this.router.navigateByUrl(`${this.router.url}/${this.matchId}`),
        error: (err) => (console.error(err.error), alert(err.error)),
      });
  }
}
