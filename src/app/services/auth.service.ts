import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private logoutTimeout: ReturnType<typeof setTimeout> | null = null;

constructor(private router:Router){}

  login() {
    const token = 'asdfghjkl1234567890';
    localStorage.setItem('authToken', token);

    this.logoutTimeout = setTimeout(() => {
      this.logout();
    }, 1000 * 60 * 10);
  }

  logout() {
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
    }
    
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);

  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
