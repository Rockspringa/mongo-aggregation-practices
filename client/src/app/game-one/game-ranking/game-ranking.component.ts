import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-game-ranking',
  templateUrl: './game-ranking.component.html',
  styleUrls: ['./game-ranking.component.css']
})
export class GameRankingComponent implements OnInit {
  players: string[] = [];
  playerScores: number[] = [];

  constructor(private gameDataService: GameDataService) {}

  ngOnInit() {
    this.players = this.gameDataService.getPlayers();
    this.playerScores = this.gameDataService.getPlayerScores();
  }

  getWinnerIndex(): number {
    let maxScore = -Infinity;
    let winnerIndex = 0;

    for (let i = 0; i < this.playerScores.length; i++) {
      if (this.playerScores[i] > maxScore) {
        maxScore = this.playerScores[i];
        winnerIndex = i;
      }
    }

    return winnerIndex;
  }

  getElapsedTime(): number {
    const currentTime = new Date();
    const elapsedMilliseconds =
      currentTime.getTime() - this.gameDataService.getStartTime().getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return elapsedSeconds;
  }
}