import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MyprofileComponent } from '../../home/myprofile/myprofile.component';
import { of, throwError } from 'rxjs';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let router: Router;
  let toastrService: ToastrService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'home/myprofile', component: MyprofileComponent },
        ]),
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
      declarations: [VerifyEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to my profile page on successful account verification', () => {
    const postDataSpy = spyOn(component['http'], 'postData').and.returnValue(of({}));

    component.verifyAccount();

    expect(postDataSpy).toHaveBeenCalledWith(`/auth/verify-email?token=${component.verifyToken}`, '');
  });

  it('should display error toast on account verification failure', () => {
    const errorResponse = { error: { message: 'Invalid token' } };
    const postDataSpy = spyOn(component['http'], 'postData').and.returnValue(throwError(errorResponse));
    const errorSpy = spyOn(toastrService, 'error');

    component.verifyAccount();

    expect(postDataSpy).toHaveBeenCalledWith(`/auth/verify-email?token=${component.verifyToken}`, '');
    expect(errorSpy).toHaveBeenCalledWith(errorResponse.error.message, 'Something Wrong!');
  });
});
