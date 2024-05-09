import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'blog-list',
    children: [
      { path: '', component: BlogListComponent },
      { path: ':id', component: BlogDetailsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
