import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { ExampleInterceptorInterceptor } from './example-interceptor.interceptor';

describe('ExampleInterceptorInterceptor', () => {
  let client: HttpClient;
  let httpTestingController: HttpTestingController;
  let interceptor: ExampleInterceptorInterceptor;
  let httpHandler: HttpHandler;


  beforeEach(() =>{ TestBed.configureTestingModule({

    providers: [
      ExampleInterceptorInterceptor,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ExampleInterceptorInterceptor,
        multi: true
      },
      ],
      imports: [
        HttpClientModule,
      ],

  })
  interceptor = TestBed.inject(ExampleInterceptorInterceptor);
});

beforeEach(() => {
  httpHandler = {
    handle: (request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
      return of();
    }
  } as HttpHandler;
});



  it('should be created', () => {
    const interceptor: ExampleInterceptorInterceptor = TestBed.inject(ExampleInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });


  it('should add the correct Authorization header for shop and customers requests', () => {
    const request = new HttpRequest('GET', 'https://example.com/shop/products');
    const expectedHeaders = {
      Authorization: 'Bearer my-customer-token'
    };
    spyOn(localStorage, 'getItem').and.returnValue('"my-customer-token"');

    interceptor.intercept(request, httpHandler).subscribe(() => {
      expect(request.headers.get('Authorization')).toEqual(expectedHeaders.Authorization);
    });
  });

  it('should add the correct Authorization header for other requests', () => {
    const request = new HttpRequest('GET', 'https://example.com/products');
    const expectedHeaders = {
      Authorization: 'Bearer my-token'
    };
    spyOn(localStorage, 'getItem').and.returnValue('"my-token"');

    interceptor.intercept(request, httpHandler).subscribe(() => {
      expect(request.headers.get('Authorization')).toEqual(expectedHeaders.Authorization);
    });
  });
});


