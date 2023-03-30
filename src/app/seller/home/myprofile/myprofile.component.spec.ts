import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyprofileComponent } from './myprofile.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
describe('MyprofileComponent', () => {
  let component: MyprofileComponent;
  let fixture: ComponentFixture<MyprofileComponent>;
  let yourService: ApiServiceService;
  let toastrService: ToastrService;
  let router: Router;


  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
    declarations: [NavbarComponent],
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyprofileComponent);
    component = fixture.componentInstance;
    yourService = TestBed.inject(ApiServiceService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call patchData() with the register value and reset the form on success', () => {
    // Arrange
    spyOn(yourService, 'patchData').and.returnValue(of({}));
    spyOn(component['toastr'], 'success');
    spyOn(component.register, 'reset');
    spyOn(component, 'displayCompanyInfo');

    // Act
    component.collection();

    // Assert
    expect(yourService.patchData).toHaveBeenCalledWith('/users/org', component.register.value);
    expect(component['toastr'].success).toHaveBeenCalledWith('Registered .', 'Successfully!');
    expect(component.register.reset).toHaveBeenCalled();
    expect(component.displayCompanyInfo).toHaveBeenCalled();
  });

  it('should show an error message when patchData() returns an error', () => {
    // Arrange
    const error = { error: { message: 'Some error message' } };
    spyOn(yourService, 'patchData').and.returnValue(throwError(error));
    spyOn(component['toastr'], 'error');

    // Act
    component.collection();

    // Assert
    expect(yourService.patchData).toHaveBeenCalledWith('/users/org', component.register.value);
    expect(component['toastr'].error).toHaveBeenCalledWith(error.error.message, 'Somthing Wrong!');
  });


  it('should call postData() with the password value and reset the form on success', () => {
    // Arrange
    spyOn(yourService, 'postData').and.returnValue(of({}));
    spyOn(component.password, 'reset');
    spyOn(component['toastr'], 'success');

    // Act
    component.forgetPassword();

    // Assert
    expect(yourService.postData).toHaveBeenCalledWith('/users/auth/change-password', component.password.value);
    expect(component.password.reset).toHaveBeenCalled();
    expect(component['toastr'].success).toHaveBeenCalledWith('Password Has Been Changed', 'Successfully!');
  });

  it('should show an error message when postData() returns an error', () => {
    // Arrange
    const error = { error: { message: 'Some error message' } };
    spyOn(yourService, 'postData').and.returnValue(throwError(error));
    spyOn(component['toastr'], 'error');
    spyOn(console, 'log');
    let router: Router;
    // Act
    component.forgetPassword();

    // Assert
    expect(yourService.postData).toHaveBeenCalledWith('/users/auth/change-password', component.password.value);
    expect(component['toastr'].error).toHaveBeenCalledWith(error.error.message, 'Somthing Wrong!');
    expect(console.log).toHaveBeenCalledWith(error);
  });

  it('should call getData() with the "/auth/self" endpoint and set userDetails on success', () => {
    // Arrange
    const res = { name: 'John Doe', email: 'john.doe@example.com' };
    spyOn(yourService, 'getData').and.returnValue(of(res));
    spyOn(console, 'log');

    // Act
    component.displayCompanyInfo();

    // Assert
    expect(yourService.getData).toHaveBeenCalledWith('/auth/self');
    expect(console.log).toHaveBeenCalledWith(res);
    expect(component.userDetails).toEqual(res);
  });

  it('should navigate to "/auth/login" when getData() returns an error', () => {
    // Arrange
    const error = { error: { message: 'Some error message' } };
    spyOn(yourService, 'getData').and.returnValue(throwError(error));
    spyOn(router, 'navigate');
    spyOn(console, 'log');

    // Act
    component.displayCompanyInfo();

    // Assert
    expect(yourService.getData).toHaveBeenCalledWith('/auth/self');
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(console.log).toHaveBeenCalledWith(error);
  });


  it('should call postData() with the "/auth/send-verification-email" endpoint and navigate to "/auth/verify-email" if userDetails.isEmailVerified is falsy', () => {
    // Arrange
    component.userDetails = { name: 'John Doe', email: 'john.doe@example.com', isEmailVerified: false };
    spyOn(yourService, 'postData').and.returnValue(of({}));
    spyOn(router, 'navigate');
    spyOn(console, 'log');

    // Act
    component.verifyAccount();

    // Assert
    expect(yourService.postData).toHaveBeenCalledWith('/auth/send-verification-email', '');
    expect(router.navigate).toHaveBeenCalledWith(['auth/verify-email']);
    expect(console.log).toHaveBeenCalled();
  });

  it('should not call postData() if userDetails.isEmailVerified is truthy', () => {
    // Arrange
    component.userDetails = { name: 'John Doe', email: 'john.doe@example.com', isEmailVerified: true };
    spyOn(yourService, 'postData');
    spyOn(router, 'navigate');
    spyOn(console, 'log');

    // Act
    component.verifyAccount();

    // Assert
    expect(yourService.postData).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log an error if postData() returns an error', () => {
    // Arrange
    component.userDetails = { name: 'John Doe', email: 'john.doe@example.com', isEmailVerified: false };
    const error = { error: { message: 'Some error message' } };
    spyOn(yourService, 'postData').and.returnValue(throwError(error));
    spyOn(router, 'navigate');
    spyOn(console, 'log');

    // Act
    component.verifyAccount();

    // Assert
    expect(yourService.postData).toHaveBeenCalledWith('/auth/send-verification-email', '');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(error);
  });
});
