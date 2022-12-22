import {AuthenticationServiceService} from '../user/authentication-service.service'
import {HttpHandler, HttpRequest, HttpInterceptor, HttpEvent} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationServiceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.token.length) {
      const clonedRequest = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authService.token}`
        ),
      })
      return next.handle(clonedRequest)
    }
    return next.handle(req)
  }

}
