import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HandlehttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('_token') !== null){
      const userToken: any = localStorage.getItem('_token');

      request = request.clone({
        setHeaders: {
          token: userToken
        }
      })
    }

    return next.handle(request);
  }
}
