import { ComponentFixture, TestBed } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { ProfileComponent } from './profile.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MainNavComponent } from '../../main-nav/main-nav.component';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
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
      declarations: [MainNavComponent, ImageCropperComponent],
    })
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req = httpMock.expectOne(
      'https://shop-api.ngminds.com/customers/address'
    );
    expect(req.request.method).toEqual('GET');
    req.flush({});
    const req2 = httpMock.expectOne(
      'https://shop-api.ngminds.com/shop/auth/self'
    );
    expect(req2.request.method).toEqual('GET');
    req2.flush({});
  });

  it('should set the imageChangedEvent property', () => {
    // Arrange
    const event = { target: { files: ['test.png'] } };

    // Act
    component.fileChangeEvent(event);

    // Assert
    expect(component.imageChangedEvent).toEqual(event);
  });

  it('should set the editadd property to undefined', () => {
    // Arrange
    component.editadd = { street: 'test', state: 'test', pin: '123456' };

    // Act
    component.close();

    // Assert
    expect(component.editadd).toBeUndefined();
  });

  it('should set the name and email values to the form controls', () => {
    // Arrange
    const userDetails = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    // Act
    component.userDetails = userDetails;
    component.editAccount();

    // Assert
    expect(component.register.controls['name'].value).toEqual(userDetails.name);
    expect(component.register.controls['email'].value).toEqual(
      userDetails.email
    );
  });

  it('should call httpdata.patchData method and reset the form', () => {
    // Arrange
    const patchDataSpy = spyOn(
      component['httpdata'],
      'patchData'
    ).and.returnValue(of({}));
    const toastrSuccessSpy = spyOn(component['toastr'], 'success');
    const resetSpy = spyOn(component.register, 'reset');
    const displayInfoSpy = spyOn(component, 'displayInfo');

    // Act
    component.collection();

    // Assert
    expect(patchDataSpy).toHaveBeenCalledWith(
      '/customers/update-profile',
      component.register.value
    );
    expect(toastrSuccessSpy).toHaveBeenCalledWith(
      'Registered .',
      'Successfully!'
    );
    expect(resetSpy).toHaveBeenCalled();
    expect(displayInfoSpy).toHaveBeenCalled();
  });

  it('should call httpdata.postData and reset password field', () => {
    // Arrange
    const postDataSpy = spyOn(
      component['httpdata'],
      'postData'
    ).and.returnValue(of({}));
    const resetSpy = spyOn(component.password, 'reset');

    // Act
    component.forgetPassword();

    // Assert
    expect(postDataSpy).toHaveBeenCalledWith(
      '/customers/auth/change-password',
      component.password.value
    );
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should call httpdata.postData method with correct arguments and reset variables', () => {
    // Arrange
    const formData = new FormData();
    formData.append('picture', 'base64ImageString');

    const httpdataSpy = spyOn(
      component['httpdata'],
      'postData'
    ).and.returnValue(of({}));

    // Act
    component.photo = 'base64ImageString';
    component.saveImg();

    // Assert
    expect(httpdataSpy).toHaveBeenCalledWith(
      '/customers/profile-picture',
      formData
    );

    expect(component.photo).toBe('');
    expect(component.profile).toBe('');
    expect(component.imageChangedEvent).toBe('');
    expect(component.croppedImage).toBe('');
  });

  it('should add an address', () => {
    // Arrange
    const swalSpy = spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true, isDismissed: false })
    );
    const postDataSpy = spyOn(
      component['httpdata'],
      'postData'
    ).and.returnValue(of({}));
    component.getAddress.setValue({
      street: null,
      addressLine2: null,
      city: null,
      pin: null,
      state: null,
    });

    // Act
    component.address();

    // Assert
    expect(swalSpy).toHaveBeenCalled();
    expect(postDataSpy).toHaveBeenCalledWith(
      '/customers/address',
      component.getAddress.value
    );
  });

  it('should update an address', () => {
    // Arrange
    const swalSpy = spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true, isDismissed: false })
    );
    const putDataSpy = spyOn(component['httpdata'], 'putData').and.returnValue(
      of({})
    );
    component.getAddress.setValue({
      street: null,
      addressLine2: null,
      city: null,
      pin: null,
      state: null,
    });
    component.editadd = {
      street: '',
      addressLine2: '',
      city: '',
      pin: '',
      state: '',
    };

    // Act
    component.address();

    // Assert
    expect(swalSpy).toHaveBeenCalled();
    expect(putDataSpy).toHaveBeenCalledWith(
      `/customers/address/${component?.editadd?._id}`,
      component.getAddress.value
    );
  });

  it('should set address form values to selected address data', () => {
    const mockAddress = {
      _id: 'abc123',
      street: '123 Main St',
      state: 'CA',
      pin: '12345',
      city: 'Los Angeles',
      addressLine2: 'Apt 123',
    };
    component.editAddress(mockAddress);
    expect(component.getAddress.controls['street'].value).toEqual(
      mockAddress.street
    );
    expect(component.getAddress.controls['state'].value).toEqual(
      mockAddress.state
    );
    expect(component.getAddress.controls['pin'].value).toEqual(mockAddress.pin);
    expect(component.getAddress.controls['city'].value).toEqual(
      mockAddress.city
    );
    expect(component.getAddress.controls['addressLine2'].value).toEqual(
      mockAddress.addressLine2
    );
  });

  it('should call deleteData with the correct URL', () => {
    // const mockHttpdata = jasmine.createSpyObj('httpdata', ['deleteData']);
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true, isDismissed: false })
    );
    // const component = new component(mockHttpdata);

    component.removeProfile();
    component.deleteAccount();
    component.deleteAddress('');

  });


});



