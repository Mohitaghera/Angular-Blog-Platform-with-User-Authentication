import { Injectable } from '@angular/core';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean = false

  constructor(private authStateService: AuthStateService) {}

  login() {
    this.isLoggedIn = true
    this.authStateService.setLoggedIn(true);

    const token = 'asdfghjkl1234567890';
    localStorage.setItem('authToken', token);
  }

  logout() {  
    this.isLoggedIn = false
    localStorage.removeItem('authToken');
    this.authStateService.setLoggedIn(false);
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
