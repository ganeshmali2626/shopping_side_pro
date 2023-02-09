import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule} from 'ng-recaptcha';
import { ExampleInterceptorInterceptor } from './Intersepters/example-interceptor.interceptor';
import { ApiServiceService } from './services/api-service.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    ApiServiceService,{
      provide:HTTP_INTERCEPTORS,
      useClass:ExampleInterceptorInterceptor,
      multi:true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
