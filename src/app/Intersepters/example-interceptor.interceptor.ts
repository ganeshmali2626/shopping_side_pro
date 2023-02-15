import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {

  constructor(private rout:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   let req:any;
    if(request.url.includes("shop/") || request.url.includes("customers")){
      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('customerlogin')!
            )}`,
          }
        });
    }
    else{

      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('login')!
            )}`,
          }
        });
    }


    return next.handle(req);
  }
}
