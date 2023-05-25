import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { Player } from 'src/model/interfaces/player.interface';
import { MatchesService } from 'src/app/services/matches/matches.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-game-ranking',
  templateUrl: './game-ranking.component.html',
  styleUrls: ['./game-ranking.component.css'],
})
export class GameRankingComponent implements OnInit {
  players: Player[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const id = param.get('id') ?? '';

      if (!id) {
        this.router.navigate(['../', '../'], { relativeTo: this.route });
      }

      this.matchesService.getMatch(id).subscribe((match) => {
        this.players = match.players.sort(
          (firstPlayer, secondPlayer) =>
            secondPlayer.points - firstPlayer.points
        );
      });
    });
  }
}
