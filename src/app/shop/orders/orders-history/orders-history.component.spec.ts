import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersHistoryComponent } from './orders-history.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
describe('OrdersHistoryComponent', () => {
  let component: OrdersHistoryComponent;
  let fixture: ComponentFixture<OrdersHistoryComponent>;
  let http: ApiServiceService;


  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersHistoryComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });





  it('should navigate to make-payment page when goToPayment method is called', () => {
    spyOn(component['rout'], 'navigate');
    component.goToPayment(1);
    expect(component['localstorage'].getpaymentId()).toBe(1);
    expect(component['rout'].navigate).toHaveBeenCalledWith(['/shop/customers/make-payment']);
  });

  it('should decrease the page number and fetch data when previousPage method is called', () => {
    spyOn(component, 'getUserData');
    component.page = 2;
    component.previousPage();
    expect(component.page).toBe(1);
    expect(component.url).toBe('/shop/orders?limit=10&page=1');
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should increase the page number and fetch data when nextPage method is called', () => {
    spyOn(component, 'getUserData');
    component.page = 1;
    component.totalpages = 2;
    component.nextPage();
    expect(component.page).toBe(2);
    expect(component.url).toBe('/shop/orders?limit=10&page=2');
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should fetch pending product data when getdata method is called', () => {
    spyOn(http, 'getData').and.returnValue(of({
      id: 1,
      name: 'Product 1'
    }));
    component.getdata(1);
    expect(component.pendingProduct.id).toBe(1);
    expect(component.pendingProduct.name).toBe('Product 1');
  });

  it('should retrieve user data from the server', () => {
    const mockData = { orders: [], totalPages: 0 };
    spyOn(http, 'getData').and.returnValue(of(mockData));

    component.getUserData();

    expect(component.totalpages).toEqual(mockData.totalPages);
  });



  it('should not call getUserData on cancel', () => {
    const httpSpy = spyOn(component['http'], 'patchData').and.returnValue(of({}));
    const getUserDataSpy = spyOn(component, 'getUserData');
    const data = 'orderId';
    component.cancelOrder(data);
    expect(getUserDataSpy).not.toHaveBeenCalled();
    expect(getUserDataSpy).not.toHaveBeenCalled();
  });
});
