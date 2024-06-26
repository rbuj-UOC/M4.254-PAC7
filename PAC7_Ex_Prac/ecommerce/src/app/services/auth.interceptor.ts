import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStoreService } from './auth-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authStore: AuthStoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authStore.token) {
      console.log('INTERCEPTING, HAS TOKEN', this.authStore.token);
      const authReq = req.clone({
        headers: req.headers.set(
          'X-AUTH-HEADER',
          this.authStore.token
        )
      });
      console.log('Making an authorized request');
      req = authReq;
    }
    return next.handle(req);
  }
}