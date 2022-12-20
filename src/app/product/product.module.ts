import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCardComponent } from './product-card/product-card.component';



@NgModule({
  declarations: [
  
    ProductListComponent,
       ProductDetailComponent,
       ProductCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
