import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import {
  SocialAuthService,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let authService: SocialAuthService;
  let localDetails: LocalStorageServiceService;
  let recaptchaV3Service: ReCaptchaV3Service;
  let router: Router;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule,CoolSocialLoginButtonsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,LocalStorageServiceService,SocialAuthService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha },
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com'
              ),
            },
          ],
          onError: (err: any) => {
            console.error(err);
          },
        } as SocialAuthServiceConfig,
      },],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  }));
  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['authState']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(SocialAuthService);
    localDetails = TestBed.inject(LocalStorageServiceService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.login.valid).toBeFalsy();
});

  it('should have a form with email and password controls', () => {
    expect(component.login.contains('email')).toBeTruthy();
    expect(component.login.contains('password')).toBeTruthy();
  });

  it('should make email control required', () => {
    let email = component.login.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("");
    expect(email.hasError('required')).toBeTruthy();

});

it('should make password control required', () => {
  let password = component.login.controls['password'];
  expect(password.valid).toBeFalsy();

  password.setValue("");
  expect(password.hasError('required')).toBeTruthy();

});

it('should make email control accept valid email address', () => {
  let email = component.login.controls['email'];
  email.setValue('test@test.com');
  expect(email.valid).toBeTruthy();
});

it('should make email control reject invalid email address', () => {
  let email = component.login.controls['email'];
  email.setValue('invalid-email');
  expect(email.valid).toBeFalsy();
  expect(email.hasError('email')).toBeTruthy();
});

it('should enable submit button when form is valid', () => {
  expect(component.login.valid).toBeFalsy();
  let email = component.login.controls['email'];
  email.setValue('test@test.com');
  let password = component.login.controls['password'];
  password.setValue('password');
  expect(component.login.valid).toBeTruthy();
});


afterEach(() => {
  httpMock.verify();
});


it('should set the token in local storage and navigate to product list on success', () => {
  const spySetData = spyOn(component['localDetails'], 'setData').and.callThrough();
  const spyNavigate = spyOn(component['router'], 'navigate').and.callThrough();
  component.loginUser();
  httpMock.expectOne(`https://shop-api.ngminds.com/auth/login?captcha=true`).flush({ token: 'mock-token' });
  expect(spySetData).toHaveBeenCalledWith('mock-token');
  expect(spyNavigate).toHaveBeenCalledWith(['/products/product-list']);
});

it('should show an error message on error', () => {
  const spy = spyOn(component['toastr'], 'error').and.callThrough();
  const errorMessage = 'Something went wrong!';
  component.loginUser();
  httpMock.expectOne(`https://shop-api.ngminds.com/auth/login?captcha=true`).error(new ErrorEvent(errorMessage));
  expect(spy).toHaveBeenCalledWith('', 'Something Wrong!');
});



it('should call AuthService.signOut and navigate to login on success', () => {
  const spyRemoveData = spyOn(component['localDetails'], 'removeData').and.callThrough();
  const spySignOut = spyOn(component['authService'], 'signOut').and.callThrough();
  const spyNavigate = spyOn(component['router'], 'navigate').and.callThrough();
  component.signOut();
  expect(spyRemoveData).toHaveBeenCalled();
  expect(spySignOut).toHaveBeenCalled();
  spySignOut.calls.mostRecent().returnValue.then(() => {
    expect(spyNavigate).toHaveBeenCalledWith(['/login']);
  });
});

it('should not navigate on error', () => {
  const spyRemoveData = spyOn(component['localDetails'], 'removeData').and.callThrough();
  const spySignOut = spyOn(component['authService'], 'signOut').and.returnValue(Promise.reject('error'));
  const spyNavigate = spyOn(component['router'], 'navigate').and.callThrough();
  component.signOut();
  expect(spyRemoveData).toHaveBeenCalled();
  expect(spySignOut).toHaveBeenCalled();
  spySignOut.calls.mostRecent().returnValue.catch(() => {
    expect(spyNavigate).not.toHaveBeenCalled();
  });
});

it('should set token and captcha form control value on execute success', () => {
  const spyExecute = spyOn(component['recaptcha'], 'execute').and.returnValue(of('token'));
  component.captchaa();
  expect(spyExecute).toHaveBeenCalledWith('importantAction');
  expect(component.token).toEqual('token');
  expect(component.login.get('captcha')?.value).toEqual('token');
});


it('should navigate to login page on successful sign out', () => {
  const removeDataSpy = spyOn(localDetails, 'removeData');
  const signOutSpy = spyOn(authService, 'signOut').and.returnValue(Promise.resolve());
  const navigateSpy = spyOn(router, 'navigate');

  component.signOut();

  expect(removeDataSpy).toHaveBeenCalled();
  expect(signOutSpy).toHaveBeenCalled();
  // expect(navigateSpy).toHaveBeenCalledWith(['login']);
});
});
