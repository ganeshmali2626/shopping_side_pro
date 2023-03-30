import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: ApiServiceService;
  let de: DebugElement;
  let httpTestingController: HttpTestingController;
  let toastrService: ToastrService;


  beforeEach(() =>{
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
    });


});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
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


  afterEach(() => {
    httpTestingController.verify();
  });

  it('should register successfully when valid data is provided', () => {
    // Arrange
    spyOn(toastrService, 'success');
    spyOn(component.register, 'reset');

    const mockResponse = { message: 'Registration successful' };
    const expectedRequestBody = {
      name: 'John Doe',
      company: 'Acme Inc.',
      email: 'john.doe@example.com',
      password: 'pa$$w0rd',
    };

    // Act
    component.register.patchValue(expectedRequestBody);
    component.collection();
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/auth/register?captcha=true');
    req.flush(mockResponse);

    // Assert
    expect(toastrService.success).toHaveBeenCalledWith('Registered .', 'Successfully!');
    expect(component.register.reset).toHaveBeenCalledWith({
      name: '',
      company: '',
      email: '',
      password: '',
    });
    expect(req.request.method).toBe('POST');
  });

  it('should display an error message when registration fails', () => {
    // Arrange
    spyOn(toastrService, 'error');

    const mockErrorResponse = { message: 'Email already exists' };
    const expectedRequestBody = {
      name: 'John Doe',
      company: 'Acme Inc.',
      email: 'john.doe@example.com',
      password: 'pa$$w0rd',
    };

    // Act
    component.register.patchValue(expectedRequestBody);
    component.collection();
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/auth/register?captcha=true');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });

    // Assert
    expect(toastrService.error).toHaveBeenCalledWith('Email already exists', 'Somthing Wrong!');
    expect(req.request.method).toBe('POST');
  });
});
