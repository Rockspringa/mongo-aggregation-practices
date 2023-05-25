import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  players: string[] = [];
  playerScores: number[] = [];
  startTime: Date = new Date();

  constructor() {}

  getPlayers(): string[] {
    return this.players;
  }

  getPlayerScores(): number[] {
    return this.playerScores;
  }

  getStartTime(): Date {
    return this.startTime;
  }

  getElapsedTime(): number {
    const currentTime = new Date();
    const elapsedMilliseconds =
      currentTime.getTime() - this.startTime.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return elapsedSeconds;
  }
}
