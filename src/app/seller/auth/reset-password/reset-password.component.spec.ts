import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let httpMock: HttpTestingController;

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
      declarations: [ResetPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a POST request to the API and navigate to the login page on success', () => {
    spyOn(component.router, 'navigate');
    spyOn(component.toastr, 'error');
    const mockResponse = { message: 'Success' };
    component.passToken = '123456789';
    component.reset.setValue({
      password: 'test1234',
      captcha: '',
    });

    component.loginUser();

    const req = httpMock.expectOne(
      `https://shop-api.ngminds.com/auth/reset-password?token=123456789`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(component.router.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(component.toastr.error).not.toHaveBeenCalled();
  });

  it('should show an error message if the API request fails', () => {
    spyOn(component.router, 'navigate');
    spyOn(component.toastr, 'error');
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const errorEvent = new ErrorEvent('Error');
    component.passToken = '123456789';
    component.reset.setValue({
      password: 'test1234',
      captcha: '',
    });

    component.loginUser();

    const req = httpMock.expectOne(
      `https://shop-api.ngminds.com/auth/reset-password?token=123456789`
    );
    expect(req.request.method).toBe('POST');
    req.error(errorEvent, mockErrorResponse);

    expect(component.router.navigate).not.toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalledWith('', 'Something Wrong!');
  });

  it('should set captcha value to token', () => {
    const token = 'abc123';
    component.reset.get('captcha')?.setValue(token);
    console.log(component.reset.get('captcha')?.setValue(token));

    expect(component.reset.get('captcha')?.value).toBe(token);
  });
});
