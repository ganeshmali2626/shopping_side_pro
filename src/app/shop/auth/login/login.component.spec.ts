import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let localDetails: LocalStorageServiceService;
  let toastr: ToastrService;
  let service: ApiServiceService;
    let httpMock: HttpTestingController;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ApiServiceService,
        LocalStorageServiceService,
        { provide: ToastrService, useClass: ToastrService },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha },
      ],
    });

});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ApiServiceService);
     httpMock = TestBed.get(HttpTestingController);
    component.ngOnInit();
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localDetails = TestBed.inject(LocalStorageServiceService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginpage.valid).toBeFalsy();
  });

  it('should have a form with email and password controls', () => {
    expect(component.loginpage.contains('email')).toBeTruthy();
    expect(component.loginpage.contains('password')).toBeTruthy();
  });

  it('should make email control required', () => {
    let email = component.loginpage.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });it('should navigate to products page on successful login', fakeAsync(() => {
    const mockResponse = { token: 'abc123' };
    const loginForm = component.loginpage;
    loginForm.controls.email.setValue('test@example.com');
    loginForm.controls.password.setValue('password123');
    spyOn(localDetails, 'customerSetData');
    spyOn(router, 'navigate');
    component.loginCustemer();
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/shop/auth/login');
    req.flush(mockResponse);
    tick();
    expect(localDetails.customerSetData).toHaveBeenCalledWith(mockResponse.token);
    expect(router.navigate).toHaveBeenCalledWith(['/shop/products']);
  }));

  it('should make password control required', () => {
    let password = component.loginpage.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('should make email control accept valid email address', () => {
    let email = component.loginpage.controls['email'];
    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('should make email control reject invalid email address', () => {
    let email = component.loginpage.controls['email'];
    email.setValue('invalid-email');
    expect(email.valid).toBeFalsy();
    expect(email.hasError('email')).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    expect(component.loginpage.valid).toBeFalsy();
    let email = component.loginpage.controls['email'];
    email.setValue('test@test.com');
    let password = component.loginpage.controls['password'];
    password.setValue('password');
    expect(component.loginpage.valid).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
});

  it('should navigate to products page on successful login', fakeAsync(() => {
    const mockResponse = { token: 'abc123' };
    const loginForm = component.loginpage;
    loginForm.controls.email.setValue('test@example.com');
    loginForm.controls.password.setValue('password123');
    spyOn(localDetails, 'customerSetData');
    spyOn(router, 'navigate');
    component.loginCustemer();
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/shop/auth/login');
    req.flush(mockResponse);
    tick();
    expect(localDetails.customerSetData).toHaveBeenCalledWith(mockResponse.token);
    expect(router.navigate).toHaveBeenCalledWith(['/shop/products']);
  }));

// it('unit test for subscribe method',fakeAsync(()=>{
//   let spy = spyOn(service,'getlistofdata').and.returnValue(of(mockList))
// }))


});
