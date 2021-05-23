import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from 'src/app/authentication/auth-guard.service';
import { ResponseResult } from '../../model/response-result';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private authService: AuthGuardService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onLogOut = (): void => {
    this.authService.logout().subscribe((res: ResponseResult<boolean>) => {
      if (res.result === true) {
        // show message
        this.router.navigate(['login']);
      }
    });
  }

  public goToHome = (): void => {
    this.router.navigate(['dashboard']);
  }

  public goToAddProduct = (): void => {
    this.router.navigate(['dashboard/add-product']);
  }

  public goToProductInventory = (): void => {
    this.router.navigate(['dashboard/product-inventory']);
  }

}
