import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { clearCart } from 'src/app/cart-state-management/cart.action';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let store: Store;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,StoreModule.forRoot({}),RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,Store,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the selected index on changeSelection', () => {
    const event = {target: {checked: true}};
    const index = 1;
    component.changeSelection(event, index);
    expect(component.selectedIndex).toBe(index);
  });

  it('should update the address on changeAddress', () => {
    component.i = 2;
    component.changeAddress();
    expect(component.a).toBe(2);
  });


  it('should show an error message if the http post request fails', () => {
    // Arrange
    const httpSpy = spyOn(component['http'], 'postData').and.returnValue(throwError({ error: { message: 'Error' } }));
    const toastrSpy = spyOn(component['toastr'], 'error');

    // Act
    component.address();

    // Assert
    expect(httpSpy).toHaveBeenCalled();
    expect(toastrSpy).toHaveBeenCalledWith('Error', 'Somthing Wrong!');
  });


  it('should call the http post request with the right data and show a success message', () => {
    // Arrange
    const httpSpy = spyOn(component['http'], 'postData').and.returnValue(of({ order: { _id: '123' } }));
    const toastrSpy = spyOn(component['toastr'], 'success');
    const clearCartSpy = spyOn(component['store'], 'dispatch');
    const setPaymentIdSpy = spyOn(component['localstorage'], 'setpaymentId');
    const routerSpy = spyOn(component['router'], 'navigate');

    component.Products = { items: [], deliveryFee: 0, total: 0 };
    component.userAddress = [{ _id: '1' }, { _id: '2' }];
    component.a = 1;

    const expectedData = {
      items: [],
      deliveryFee: 0,
      total: 0,
      address: { _id: '2' },
    };

    // Acttoastr
    component.sendUserInfo();

    // Assert
    expect(httpSpy).toHaveBeenCalledWith('/shop/orders', expectedData);
    expect(toastrSpy).toHaveBeenCalledWith('Placed .', 'Successfully!');
    expect(clearCartSpy).toHaveBeenCalledWith(clearCart());
    expect(setPaymentIdSpy).toHaveBeenCalledWith('123');
    expect(routerSpy).toHaveBeenCalledWith(['/shop/customers/make-payment']);
  });



  it('should retrieve cart data from store', () => {
    // create mock data for the store
    const mockData = { items: [], deliveryFee: 0, total: 0 };
    spyOn(store, 'select').and.returnValue(of(mockData));

    // call the method
    component.getCarts();

    // assert that the retrieved data is equal to the mock data
    expect(component.Products).toEqual(mockData);
  });


});




