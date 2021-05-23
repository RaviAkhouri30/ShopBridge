import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';
import { NonAuthService } from './authentication/non-auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [NonAuthService],
    children: [{
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      canLoad: [NonAuthService]
    }]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    children: [{
      path: '',
      loadChildren: () => import('./main/main.module').then(m => m.MainModule),
      canLoad: [AuthGuardService]
    }]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports:
    [RouterModule.forRoot(routes, { useHash: true })
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
