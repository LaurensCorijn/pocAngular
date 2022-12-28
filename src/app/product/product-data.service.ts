import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Product, ProductJson } from '../structures/product.model'
import {BehaviorSubject, Observable, throwError} from 'rxjs'
import {environment} from 'src/environments/environment'
import { catchError, map, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private _products$ = new BehaviorSubject<Product[]>([])
  //private _products: Product[]

  constructor(private http: HttpClient) { }

  getProducts$(): Observable<Product[]>{
    return this.http.get(`https://apipoc20221227200802.azurewebsites.net/api/product/`).pipe(tap(console.log),
      catchError(this.handleError), map((list: any[]): Product[] => list.map(Product.fromJSON))
    )
  }

  getProduct$(id: string): Observable<Product>{
    return this.http
      .get(`https://apipoc20221227200802.azurewebsites.net/api/product/${id}`).pipe(tap(console.log),catchError(this.handleError),map(Product.fromJSON))
  }

  addNewProduct(product: Product) {
    return this.http.post(`https://apipoc20221227200802.azurewebsites.net/api/product`, product.toJSON()).pipe()
      .pipe(tap(console.log),catchError(this.handleError), map(Product.fromJSON))
      .pipe(catchError((err) => {
        return throwError(err)
      }))
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`
    } else {
      errorMessage = `an unknown error occured ${err}`
    }
    console.error(err)
    return throwError(errorMessage)
  }
}
