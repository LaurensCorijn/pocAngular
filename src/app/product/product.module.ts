import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { MaterialModule } from '../material/material/material.module'
import {RouterModule, Routes } from '@angular/router'
import {ProductResolver} from './ProductResolver';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductAddComponent } from './product-add/product-add.component'
import {ReactiveFormsModule} from '@angular/forms'


const routes: Routes = [
  {path: 'list', component: ProductListComponent},
  {path: 'detail/:id', component: ProductDetailComponent, resolve: {product: ProductResolver}},
  {path: 'add', component: ProductAddComponent},
  //path toevoegen voor add
]

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCardComponent,
    ProductFilterPipe,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ProductListComponent]
})
export class ProductModule { }
