import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseResult } from 'src/app/common/model/response-result';
import { ProductModel } from '../add-product/model/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private productInventory!: BehaviorSubject<ProductModel[]>;


  constructor() { }

  /**
   * @description Using Observable to mimic the HttpClient Call for Saving the Product
   * @param productData product data
   * @returns Observable<ResponseResult<ProductModel[]>>
   */

  public addProductToInventory = (productData: ProductModel): Observable<ResponseResult<ProductModel[]>> => {
    return new Observable(observer => {
      const resp: ResponseResult<ProductModel[]> = {
        message: 'Record Saved Sucessfully',
        result: [],
        status: 200
      };
      if (this.productInventory instanceof BehaviorSubject) {
        const inventory = this.productInventory.getValue();
        inventory.push(productData);
        this.productInventory.next(inventory);
        resp.result = this.productInventory.getValue();
        observer.next(resp);
        return;
      }
      this.productInventory = new BehaviorSubject<ProductModel[]>([productData]);
      resp.result = this.productInventory.getValue();
    });
  }

  /**
   * Getter and Setter for Product Inventory to generate the Ids
   * @returns productInventory
   */

  public getProductInventory(): BehaviorSubject<ProductModel[]> {
    return this.productInventory;
  }

  public setProductInventory(productInventory: BehaviorSubject<ProductModel[]>): void {
    this.productInventory = productInventory;
  }

  /**
   * @description To get The Product Inventory Data
   * @returns Product Inventory Data
   */

  public getProductInventoryData = (): Observable<ResponseResult<ProductModel[]>> => {
    return new Observable(observer => {
      const resp: ResponseResult<ProductModel[]> = {
        message: 'Records fetch Sucessfully',
        result: [],
        status: 200
      };
      if (this.productInventory instanceof BehaviorSubject) {
        resp.result = this.getProductInventory().getValue();
        observer.next(resp);
        return;
      }
      resp.message = 'No Record Found';
      resp.status = 401;
      observer.error(resp);
    });
  }

  /**
   * @description To Delete the Record, I have not implemented the soft delete to complexity
   * @param id Product Id
   * @returns ResponseResult<ProductModel[]>
   */

  public deleteRecord = (id: number): Observable<ResponseResult<ProductModel[]>> => {
    return new Observable(observer => {
      const resp: ResponseResult<ProductModel[]> = {
        message: 'Records Deleted Sucessfully',
        result: [],
        status: 200
      };
      const index = this.getProductInventory().getValue().findIndex(e => e.id === id);
      this.getProductInventory().getValue().splice(index, 1);
      this.getProductInventory().next(this.getProductInventory().getValue());
      resp.result = this.getProductInventory().getValue();
      observer.next(resp);
    });
  }

  public getProductDataById = (id: number): Observable<ResponseResult<ProductModel>> => {
    return new Observable(observer => {
      const resp: ResponseResult<ProductModel> = {
        message: 'Records Deleted Sucessfully',
        result: { id: 0, description: '', price: 0, productName: '' },
        status: 200
      };
      const result: ProductModel = this.getProductInventory().getValue().find(e => e.id === id) ||
        { id: 0, description: '', price: 0, productName: '' };
      resp.result = result;
      observer.next(resp);
    });
  }

  public updateProductDataById = (product: ProductModel): Observable<ResponseResult<null>> => {
    return new Observable(observer => {
      const resp: ResponseResult<null> = {
        message: 'Record Updated Sucessfully',
        result: null,
        status: 200
      };
      const index: number = this.getProductInventory().getValue().findIndex(e => e.id === product.id) || -1;
      this.getProductInventory().getValue().splice(index, 1, product);
      observer.next(resp);
    });
  }

}
