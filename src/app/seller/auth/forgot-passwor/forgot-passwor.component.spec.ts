import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassworComponent } from './forgot-passwor.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('ForgotPassworComponent', () => {
  let component: ForgotPassworComponent;
  let fixture: ComponentFixture<ForgotPassworComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,Router,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }]
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPassworComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassworComponent);
    component = fixture.componentInstance;
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

  it('should navigate to reset password page on success', () => {
    const spy = spyOn(component['router'], 'navigate').and.callThrough();
    component.loginUser();
    httpMock.expectOne('https://shop-api.ngminds.com/auth/forgot-password').flush({});
    expect(spy).toHaveBeenCalledWith(['/auth/reset-password']);
  });

  it('should show an error message on error', () => {
    const spy = spyOn(component['toastr'], 'error').and.callThrough();
    const errorMessage = 'Something went wrong!';
    component.loginUser();
    httpMock.expectOne('https://shop-api.ngminds.com/auth/forgot-password').error(new ErrorEvent(errorMessage));
    expect(spy).toHaveBeenCalledWith('', 'Something Wrong!');
  });
});
