import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseResult } from 'src/app/common/model/response-result';
import { ProductModel } from '../add-product/model/product-model';
import { ProductServiceService } from '../product-service/product-service.service';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css']
})
export class ProductInventoryComponent implements OnInit, OnDestroy {

  private productData: ProductModel[];
  private subscription!: Subscription;

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) {
    this.productData = [];
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProductInventoryData();
  }

  /**
   * @description To Receive Product Inventory List
   */

  public getProductInventoryData = (): void => {
    this.productService.getProductInventoryData().subscribe((res: ResponseResult<ProductModel[]>) => {
      if (res.status === 200) {
        this.productData = res.result;
      }
    }, (err: ResponseResult<ProductModel>) => {
      console.error(err);
    });
  }

  /**
   * @description To delete Single Record from the List at a Time
   * @param id Product Id
   */

  public onDelete = (id: number): void => {
    this.productService.deleteRecord(id).subscribe((res: ResponseResult<ProductModel[]>) => {
      if (res.status === 200) {
        this.productData = res.result;
      }
    });
  }

  /**
   * @description To edit the data
   * @param id product id
   */

  public onEdit = (id: number): void => {
    this.router.navigate(['dashboard/edit-product', id]);
  }

  /**
   * @description Setters Getters for Product Data
   * @returns Product Data
   */

  public getProductData(): ProductModel[] {
    return this.productData;
  }

  public setProductData(productData: ProductModel[]): void {
    this.productData = productData;
  }

}
