import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from '../../home/navbar/navbar.component';
import { Router } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
    declarations: [NavbarComponent],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve user data on initialization', () => {
    spyOn(component, 'getUserData');
    component.ngOnInit();
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should navigate to product details page when temp() is called', () => {
    const data = 'example data';
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.temp(data);
    expect(router.navigate).toHaveBeenCalledWith(['/products/one-product'], { state: { example: data } });
  });

  it('should sort the data by the selected option when sortByData() is called', () => {
    const data = 'price';
    component.sortByData(data);
    expect(component.sortBy).toBe(data);
    expect(component.url).toBe(`/products?limit=${component.limit}&page=${component.page}&sortBy=${component.sortBy}`);
  });

  it('should search for products by name when serchValue() is called', () => {
    const data = 'product name';
    component.serchValue(data);
    expect(component.name1).toBe(data);
    expect(component.url).toBe(`/products?limit=${component.limit}&page=${component.page}&name=${component.name1}`);
  });

  it('should reset the search value to empty string when serchValue() is called with empty string', () => {
    const data = '';
    component.serchValue(data);
    expect(component.name1).toBe(data);
    expect(component.url).toBe(`/products?limit=${component.limit}&page=${component.page}`);
  });

  it('should go to previous page when previousPage() is called', () => {
    component.page = 2;
    component.previousPage();
    expect(component.page).toBe(1);
    expect(component.url).toBe(`/products?limit=${component.limit}&page=${component.page}`);
  });

  it('should go to next page when nextPage() is called', () => {
    component.page = 2;
    component.nextPage();
    expect(component.page).toBe(3);
    expect(component.url).toBe(`/products?limit=${component.limit}&page=${component.page}`);
  });

  it('should change the limit value and update the data when handleLimit() is called', () => {
    const data = 10;
    component.handleLimit(data);
    expect(component.limit).toBe(data);
    expect(component.url).toBe(`/products?limit=${component.limit}&page=${component.page}`);
  });
});
