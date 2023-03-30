import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MakePaymentComponent } from './make-payment.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
describe('MakePaymentComponent', () => {
  let component: MakePaymentComponent;
  let fixture: ComponentFixture<MakePaymentComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,StoreModule.forRoot({}),RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,Store,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should fetch cart data from store', () => {
    const state = { items: ['item1', 'item2'], deliveryFee: 5, total: 50 };
    spyOn(component['store'], 'select').and.returnValue(of(state));
    component.getCarts();
    expect(component.Products).toEqual(state);
  });

  it('should submit cart data to server', () => {
    const data = { value: 'test data' };
    const response = { order: { _id: '123456' } };
    spyOn(component.toastr, 'success');
    spyOn(component['http'], 'putData').and.returnValue(of(response));
    spyOn(component.router, 'navigate');
    component.PaymentId = 'payment_id';
    component.getCartData(data);
    expect(component.toastr.success).toHaveBeenCalledWith('Order Placed .', 'Successfully!');
    expect(component.router.navigate).toHaveBeenCalledWith(['/shop/products']);
  });
});
