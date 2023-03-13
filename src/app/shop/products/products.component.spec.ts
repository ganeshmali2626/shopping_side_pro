import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { MainNavComponent } from '../main-nav/main-nav.component';
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,StoreModule.forRoot({}),RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,Store,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
    declarations: [MainNavComponent],
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
