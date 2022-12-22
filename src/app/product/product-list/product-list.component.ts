import { Component, OnInit } from '@angular/core';
import {ProductDataService} from '../product-data.service'
import {Subject, Observable, EMPTY} from 'rxjs'
import { distinctUntilChanged, debounceTime, map, catchError, tap} from 'rxjs/operators'
import { Product } from '../../structures/product.model'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  public filterProductName: string = ''
  public filterProduct$ = new Subject<string>()
  public errorMessage: string = ''
  private _fetchProducts$: Observable<Product[]> = new Observable<Product[]>()

  constructor(private _productService: ProductDataService) {
    this.filterProduct$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      ).subscribe(
        val => this.filterProductName = val
    )
  }

  get products$(): Observable<Product[]> {
    return this._fetchProducts$;
  }

  ngOnInit(): void {
    this._fetchProducts$ = this._productService.getProducts$().pipe(
      catchError(err => {
        this.errorMessage = err
        return EMPTY
      })
    )
  }
}
