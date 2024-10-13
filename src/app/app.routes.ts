import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './pages/users/list/user-list.component';
import { RoleListComponent } from './pages/roles/list/role-list.component';
import { LoginLayoutComponent } from './core/auth/login-layout/login-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
      path: '',
      component: NavigationComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: DashboardComponent },
        { path: 'users', component: UserListComponent },
        { path: 'roles', component: RoleListComponent }
      ]
    },
    {
      path: 'auth',
      component: LoginLayoutComponent,
      children: [
        { path: 'login', component: LoginComponent }
      ]
    },
    { path: '**', redirectTo: 'auth/login' }
  ];
