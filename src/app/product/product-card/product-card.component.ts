import { Component, Input } from '@angular/core'
import {Product} from '../../structures/product.model'
import {ProductDataService} from './../product-data.service'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() public product: Product | undefined

  constructor() {}
}
