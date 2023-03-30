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


  it('should call getUserData() method on initialization', () => {
    spyOn(component, 'getUserData');
    component.ngOnInit();
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should set sortBy value and call getUserData() method', () => {
    spyOn(component, 'getUserData');
    component.sortByData('price');
    expect(component.sortBy).toBe('price');
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should set name1 value and call getUserData() method', () => {
    spyOn(component, 'getUserData');
    component.serchValue('product');
    expect(component.name1).toBe('product');
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should decrease page value and call getUserData() method', () => {
    spyOn(component, 'getUserData');
    component.page = 2;
    component.previousPage();
    expect(component.page).toBe(1);
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should increase page value and call getUserData() method', () => {
    spyOn(component, 'getUserData');
    component.nextPage();
    expect(component.page).toBe(2);
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should set limit value and call getUserData() method', () => {
    spyOn(component, 'getUserData');
    component.handleLimit(10);
    expect(component.limit).toBe(10);
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should add data to cart and dispatch actions', () => {
    spyOn(component['store'], 'dispatch');
    const data = { _id: 1, name: 'Product', price: 10 };
    component.add(data);
    // expect(data.qty).toBe(1);
    // expect(data.subTotal).toBe(10);
    // expect(data.productId).toBe(1);
    expect(component['store'].dispatch).toHaveBeenCalledTimes(2);
  });

  it('should add data to cart and dispatch actions and navigate to create order page', () => {
    spyOn(component['store'], 'dispatch');
    spyOn(component['rout'], 'navigate');
    const data = { _id: 1, name: 'Product', price: 10 };
    component.buyNow(data);
    // expect(data.qty).toBe(1);
    // expect(data.subTotal).toBe(10);
    // expect(data.productId).toBe(1);
    expect(component['store'].dispatch).toHaveBeenCalledTimes(2);
    expect(component['rout'].navigate).toHaveBeenCalledWith(['/shop/customers/creat-order']);
  });
});
