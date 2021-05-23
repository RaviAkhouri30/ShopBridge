import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AlphabetsWithSpaceDirective } from '../common/directives/alphabets-with-space.directive';
import { OnlyNumbersDirective } from '../common/directives/only-numbers.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    AlphabetsWithSpaceDirective,
    OnlyNumbersDirective,
    ProductInventoryComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
