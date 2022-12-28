import { Component, OnInit } from '@angular/core';
import { Product } from '../../structures/product.model'
import {ProductDataService} from '../product-data.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  public product: Product | undefined

  constructor(private route: ActivatedRoute, private ProductDataService: ProductDataService) {
  }

  ngOnInit() {
    this.route.data.subscribe(item => this.product = item['product'])
  }
}
