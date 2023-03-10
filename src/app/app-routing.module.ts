import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy'

const appRoutes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule),
    data: {preload: true}
  },
  {
    path: '', redirectTo: 'product/list', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: SelectivePreloadStrategy})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
