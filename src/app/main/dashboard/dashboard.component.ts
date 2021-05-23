import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onAddProduct = (): void => {
    this.router.navigate(['dashboard/add-product']);
  }

  public onProductInventory = (): void => {
    this.router.navigate(['dashboard/product-inventory']);
  }

}
