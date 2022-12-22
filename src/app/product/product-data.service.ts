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
    return this.http.get(`${environment.apiUrl}/products/`).pipe(tap(console.log),
      catchError(this.handleError), map((list: any[]): Product[] => list.map(Product.fromJSON))
    )
  }

  getProduct$(id: string): Observable<Product>{
    return this.http
      .get(`${environment.apiUrl}/products/${id}`).pipe(tap(console.log),catchError(this.handleError),map(Product.fromJSON))
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
