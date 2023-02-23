import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { ExampleInterceptorInterceptor } from './Intersepters/example-interceptor.interceptor';
import { ApiServiceService } from './services/api-service.service';
import { SellerRoutingModule } from './seller/seller-routing.module';
import { ShopModule } from './shop/shop.module';
import { StoreModule } from '@ngrx/store';
import { state } from '@angular/animations';
import { cartReducer, cartReducer1 } from './cart-state-management/cart.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SellerRoutingModule,
    ShopModule,
    StoreModule.forRoot({state:cartReducer,state1:cartReducer1}),
    RecaptchaModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],
  providers: [
    ApiServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExampleInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
