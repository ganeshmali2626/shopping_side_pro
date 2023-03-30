import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListComponent } from './order-list.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
        ToastrModule.forRoot(),
      ],
      providers: [
        ApiServiceService,
        { provide: ToastrService, useClass: ToastrService },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha },
      ],
    })
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call http.getData() with the correct URL and set pendingProduct property', () => {
    const data = 1;
    const httpSpy = spyOn(component['http'], 'getData').and.returnValue(
      of([{ id: 1, name: 'product 1' }])
    );
    component.getdata(data);
    expect(httpSpy).toHaveBeenCalledWith('/orders/1');
    expect(component.pendingProduct).toEqual({ id: 1, name: 'product 1' });
  });

  it('should log error when http.getData() returns an error', () => {
    const data = 1;
    const error = new Error('http error');
    spyOn(component['http'], 'getData').and.returnValue(throwError(error));
    const consoleSpy = spyOn(console, 'log');
    component.getdata(data);
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });

  it('should decrease the page number by 1, update the URL and call getUserData()', () => {
    const getUserDataSpy = spyOn(component, 'getUserData');
    component.page = 2;
    component.limit = 10;
    component.url = '/orders?limit=10&page=2';
    component.previousPage();
    expect(component.page).toBe(1);
    expect(component.url).toBe('/orders?limit=10&page=1');
    expect(getUserDataSpy).toHaveBeenCalled();
  });

  it('should increase the page number by 1, update the URL and call getUserData()', () => {
    const getUserDataSpy = spyOn(component, 'getUserData');
    component.page = 1;
    component.limit = 10;
    component.url = '/orders?limit=10&page=1';
    component.nextPage();
    expect(component.page).toBe(2);
    expect(component.url).toBe('/orders?limit=10&page=2');
    expect(getUserDataSpy).toHaveBeenCalled();
  });

  it('should call http.patchData() with the correct URL and call getUserData()', () => {
    const data = {
      target: { innerText: '1' },
    };
    const data1 = 'cancel';
    const httpSpy = spyOn(component['http'], 'patchData').and.returnValue(
      of({ message: 'success' })
    );
    const getUserDataSpy = spyOn(component, 'getUserData');
    component.action(data, data1);
    expect(httpSpy).toHaveBeenCalledWith('/orders/1/cancel', '');
    expect(getUserDataSpy).toHaveBeenCalled();
  });

  it('should log error when http.patchData() returns an error', () => {
    const data = {
      target: { innerText: '1' },
    };
    const data1 = 'cancel';
    const error = new Error('http error');
    spyOn(component['http'], 'patchData').and.returnValue(throwError(error));
    const consoleSpy = spyOn(console, 'log');
    component.action(data, data1);
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });

  it('should call http.getData() with the correct URL and update orders and totalpages', () => {
    const httpSpy = spyOn(component['http'], 'getData').and.returnValue(
      of({ data: [], totalPages: 10 })
    );
    component.url = '/orders?limit=10&page=1';
    component.getUserData();
    expect(httpSpy).toHaveBeenCalledWith('/orders?limit=10&page=1');
    expect(component.orders).toEqual({ data: [], totalPages: 10 });
    expect(component.totalpages).toBe(10);
  });

  it('should log error when http.getData() returns an error', () => {
    const error = new Error('http error');
    spyOn(component['http'], 'getData').and.returnValue(throwError(error));
    const consoleSpy = spyOn(console, 'log');
    component.getUserData();
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
