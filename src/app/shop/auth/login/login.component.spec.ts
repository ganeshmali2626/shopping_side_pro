import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component = fixture.componentInstance;
    component.ngOnInit();
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

    email.setValue("");
    expect(email.hasError('required')).toBeTruthy();

});

it('should make password control required', () => {
  let password = component.loginpage.controls['password'];
  expect(password.valid).toBeFalsy();

  password.setValue("");
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

  
});
