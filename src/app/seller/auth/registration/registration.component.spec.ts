import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: ApiServiceService;
  let de: DebugElement;

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
      declarations: [RegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(ApiServiceService);
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the registration form', () => {
    const form = de.query(By.css('form')).nativeElement;
    expect(form).toBeTruthy();
  });


  it('should disable the submit button until all fields are filled', () => {
    const submitButton = de.query(By.css('button[type=submit]'))?.nativeElement;
    expect(submitButton.disabled).toBeTruthy();

    const nameInput = de.query(By.css('input[name=name]'))?.nativeElement;
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));

    const emailInput = de.query(By.css('input[name=email]'))?.nativeElement;
    emailInput.value = 'johndoe@example.com';
    emailInput.dispatchEvent(new Event('input'));

    const passwordInput = de.query(By.css('input[name=password]'))?.nativeElement;
    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalsy();
  });
});
