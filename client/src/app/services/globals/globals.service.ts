import { Injectable } from '@angular/core';
import { User } from 'src/app/autenticacion/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  private baseUrl = 'http://localhost:3001/';

  getBaseUrl() {
    return this.baseUrl;
  }

  getUser() {
    const user = localStorage.getItem('actualUser') || '{}';
    return JSON.parse(user) as User;
  }

  deleteUser() {
    localStorage.removeItem('actualUser');
  }
}
