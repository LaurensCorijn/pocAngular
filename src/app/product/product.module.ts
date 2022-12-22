import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { MaterialModule } from '../material/material/material.module'
import {RouterModule, Routes } from '@angular/router'
import {ProductResolver} from './ProductResolver';
import { ProductFilterPipe } from './product-filter.pipe'


const routes: Routes = [
  {path: 'list', component: ProductListComponent},
  {path: 'detail/:id', component: ProductDetailComponent, resolve: {product: ProductResolver}},
]

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCardComponent,
    ProductFilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [ProductListComponent]
})
export class ProductModule { }
