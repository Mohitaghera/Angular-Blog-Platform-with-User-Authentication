import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../services/auth-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit,OnDestroy {
  isLogged: boolean = false;
  blogSub!: Subscription;

  constructor(
    private authStateService: AuthStateService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  
  this.blogSub =  this.authStateService.isLoggedIn$.subscribe((isLoggedIn) => {
    this.isLogged = isLoggedIn;
    });
  }

  logout() {
    this.isLogged = false
    this.authService.logout();
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
      this.blogSub.unsubscribe();
  }
}
