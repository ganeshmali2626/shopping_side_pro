import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { addTotal, decrementQuantity, deleteProduct, incrementQuantity } from 'src/app/cart-state-management/cart.action';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: Store;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,StoreModule.forRoot({}),RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,Store,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decrement product quantity', () => {
    const data = { id: 1, name: 'Product 1', quantity: 2, price: 10 };
    component.minusproduct(data);
    expect(store.dispatch).toHaveBeenCalledWith(decrementQuantity({dataInfo: data}));
    expect(store.dispatch).toHaveBeenCalledWith(addTotal());
  });

  it('should increment product quantity', () => {
    const data = { id: 1, name: 'Product 1', quantity: 2, price: 10 };
    component.plusproduct(data);
    expect(store.dispatch).toHaveBeenCalledWith(incrementQuantity({dataInfo: data}));
    expect(store.dispatch).toHaveBeenCalledWith(addTotal());
  });

  it('should delete product', () => {
    const data = { id: 1, name: 'Product 1', quantity: 2, price: 10 };
    component.deletedata(data);
    expect(store.dispatch).toHaveBeenCalledWith(deleteProduct({dataInfo: data}));
    expect(store.dispatch).toHaveBeenCalledWith(addTotal());
  });
});
