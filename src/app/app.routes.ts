import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'blog-list',
    children: [
      { path: '', component: BlogListComponent,canActivate: [AuthGuard] },
      { path: ':id', component: BlogDetailsComponent,canActivate: [AuthGuard] },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
