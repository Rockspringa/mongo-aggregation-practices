import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../autenticacion/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  signup(user: User) {
    return this.http.post(`${this.baseUrl}/users/create`, user);
  }

  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/users/login`, body);
  }
  
}