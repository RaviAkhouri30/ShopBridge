import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthService implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private authService: AuthGuardService
  ) { }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean => {
    if (!this.authService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['dashboard']);
    return false;
  }

  public canLoad = (route: Route): boolean => {
    if (!this.authService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['dashboard']);
    return false;
  }

}
