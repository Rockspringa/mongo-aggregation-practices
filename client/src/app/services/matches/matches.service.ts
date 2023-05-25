import { Injectable } from '@angular/core';
import { GlobalsService } from '../globals/globals.service';
import { HttpClient } from '@angular/common/http';
import { Match } from 'src/model/interfaces/match.interface';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private globalsService: GlobalsService
  ) {
    this.baseUrl = this.globalsService.getBaseUrl() + 'matches';
  }

  getMatch(id: string) {
    return this.http.get<Match>(`${this.baseUrl}/${id}`);
  }

  getState(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}/state`);
  }

  createMatch(game: string, creator: string, state: any) {
    return this.http.post<Match>(`${this.baseUrl}/`, {
      game,
      state,
      creator,
    });
  }

  addPlayer(_id: string, username: string, guest?: boolean, points?: number) {
    return this.http.post<void>(`${this.baseUrl}/players`, {
      _id,
      username,
      guest,
      points,
    });
  }

  updateMatchState(_id: string, state: any) {
    return this.http.put<Match>(`${this.baseUrl}/`, { _id, state });
  }

  updatePlayerPoints(_id: string, username: string, points: number) {
    return this.http.put<void>(`${this.baseUrl}/players`, {
      _id,
      username,
      points,
    });
  }
}
