import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import { Observable } from 'rxjs'
import {Product} from '../structures/product.model'
import {ProductDataService} from './product-data.service'

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product>{
  constructor(private productService: ProductDataService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Product> {
            return this.productService.getProduct$(route.params['id'])
  }
}
