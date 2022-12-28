import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../structures/product.model'

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[] | null, name: string): Product[]  {
    if (products == null) {
      return []
    }
    if (!name || name.length === 0) {
      return products
    }
    return products.filter(rec =>
      rec.name.toLowerCase().startsWith(name.toLowerCase()))
  }

}
