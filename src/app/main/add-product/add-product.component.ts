import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseResult } from 'src/app/common/model/response-result';
import { ProductServiceService } from '../product-service/product-service.service';
import { GenerateId } from './generate-id/generate-id';
import { ProductModel } from './model/product-model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public addEditProductForm!: FormGroup;

  public generateId: GenerateId;

  public recordSavedFLag: string;
  private subscription!: Subscription;
  private idForEdit: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.generateId = new GenerateId(this.productService);
    this.recordSavedFLag = '';
    this.idForEdit = 0;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.getRouteParameter();
    this.getDataForEdit();
  }

  /**
   * @description To Create Form
   */

  public createForm = (): void => {
    this.addEditProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * @description This function triggers when user Submit the Data
   * @returns nothing
   */

  public onAddEditProduct = (): void => {
    if (this.addEditProductForm.invalid) {
      this.recordSavedFLag = 'Invalid Data';
      setTimeout(() => {
        this.recordSavedFLag = '';
      }, 3000);
      return;
    }
    const param: ProductModel = this.addEditProductForm.getRawValue();
    this.addEditProductForm.reset();
    param.id = this.idForEdit;
    if (!this.idForEdit) {
      this.generateId.generateId();
      param.id = this.generateId.getId();
      this.subscription = this.productService.addProductToInventory(param).subscribe((res: ResponseResult<ProductModel[]>) => {
        if (res.status === 200) {
          this.recordSavedFLag = res.message;
          setTimeout(() => {
            this.recordSavedFLag = '';
          }, 3000);
        }
      });
      return;
    }

    this.subscription = this.productService.updateProductDataById(param).subscribe((res: ResponseResult<null>) => {
      if (res.status === 200) {
        this.recordSavedFLag = res.message;
        setTimeout(() => {
          this.recordSavedFLag = '';
        }, 3000);
      }
    });

  }

  /**
   * @description To get Id form Route Parameters
   */

  public getRouteParameter = (): void => {
    this.activatedRoute.params.subscribe(res => {
      if (res && res.id) {
        this.idForEdit = Number(res.id);
      }
    });
  }

  /**
   * @description to get the data by id and patch the same in the form.
   */

  public getDataForEdit = (): void => {
    if (this.idForEdit === 0) {
      return;
    }
    this.subscription = this.productService.getProductDataById(this.idForEdit).subscribe((res: ResponseResult<ProductModel>) => {
      if (res.status === 200) {
        this.addEditProductForm.patchValue({
          productName: res.result.productName,
          price: res.result.price,
          description: res.result.description
        });
      }
    });
  }

}
