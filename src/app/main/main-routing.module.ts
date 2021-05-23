import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'product-inventory',
    component: ProductInventoryComponent
  },
  {
    path: 'edit-product/:id',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
