import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseResult } from '../common/model/response-result';
import { LoginModel } from '../login/login-page/model/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad, CanActivate {

  private readonly staticCredential: LoginModel = {
    userName: 'Admin',
    password: 'admin123'
  };

  private res: ResponseResult<LoginModel>;
  private logoutRes: ResponseResult<boolean>;

  constructor(
    private router: Router
  ) {
    this.res = {
      message: '',
      result: {
        password: '',
        userName: ''
      },
      status: 0
    };
    this.logoutRes = {
      message: 'Logout Sucessfully',
      result: true,
      status: 200
    };
  }

  public login = (credentials: LoginModel): Observable<ResponseResult<LoginModel>> => {
    return new Observable(observer => {
      if (credentials.userName === this.staticCredential.userName && credentials.password === this.staticCredential.password) {
        this.res.message = 'Login Sucessfully';
        this.res.result.userName = credentials.userName;
        this.res.result.password = credentials.password;
        this.res.status = 200;
        observer.next(this.res);
        return;
      }
      this.res.message = 'Invalid Credentials';
      this.res.result.userName = '';
      this.res.result.password = '';
      this.res.status = 401;
      observer.error(this.res);
    });
  }

  public setLoginSession = (credentials: LoginModel): void => {
    localStorage.setItem('userName', credentials.userName);
  }

  public logout = (): Observable<ResponseResult<boolean>> => {
    return new Observable(observer => {
      localStorage.removeItem('userName');
      observer.next(this.logoutRes);
    });
  }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean => {
    if (this.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  public canLoad = (route: Route): boolean => {
    if (this.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  public isUserLoggedIn = (): boolean => {
    const loggedInUser = localStorage.getItem('userName');
    if (loggedInUser) {
      return true;
    }
    return false;
  }

}
