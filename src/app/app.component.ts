import { Component } from '@angular/core';
import { AuthGuardService } from './authentication/auth-guard.service';
import { ResponseResult } from './common/model/response-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthGuardService
  ) { }

  public isHeaderFooterShow = (): boolean => {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    return false;
  }

}
