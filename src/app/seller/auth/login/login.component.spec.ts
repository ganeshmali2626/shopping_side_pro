import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import {
  SocialAuthService,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule,CoolSocialLoginButtonsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,SocialAuthService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha },
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
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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

});
