import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let httpMock: HttpTestingController;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() =>{
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);
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
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: ToastrService, useClass: ToastrService },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    // Verify
    httpMock.verify();
  });

  it('should make an HTTP POST request with the correct data', () => {
    // Arrange
    const expectedFormData = new FormData();
    expectedFormData.append('description', 'Test description');
    expectedFormData.append('name', 'Test name');
    expectedFormData.append('price', '10.99');
    expectedFormData.append('images', new Blob(), 'test-image.jpg');
    component.CreateProduct.setValue({
      description: 'Test description',
      name: 'Test name',
      price: null,
      images: 'test-image.jpg'
    });
    component.files = [new File([''], 'test-image.jpg')];

    // Act
    component.CreatePro();

    // Assert
    const request = httpMock.expectOne('https://shop-api.ngminds.com/products');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(expectedFormData);

    request.flush({}); // Mock response


    expect(component.productImg).toEqual([]);
    expect(component.files).toEqual([]);
  });

  it('should log an error if the HTTP request fails', () => {
    // Arrange
    spyOn(console, 'log');
    component.CreateProduct.setValue({
      description: 'Test description',
      name: 'Test name',
      price: null,
      images: 'test-image.jpg'
    });
    component.files = [new File([''], 'test-image.jpg')];

    // Act
    component.CreatePro();
    const request = httpMock.expectOne('https://shop-api.ngminds.com/products');
    request.error(new ErrorEvent('network error'));

    // Assert
    expect(console.log).toHaveBeenCalled();
  });

  it('should add files to the files array', () => {
    // Arrange
    const mockFile = new File([''], 'test.jpg');
    const mockEvent = { addedFiles: [mockFile] };

    // Act
    component.onSelect(mockEvent);

    // Assert
    expect(component.files).toEqual([mockFile]);
  });
  it('should remove the specified file from the files array', () => {
    // Arrange
    const mockFile1 = new File([''], 'test1.jpg');
    const mockFile2 = new File([''], 'test2.jpg');
    component.files = [mockFile1, mockFile2];
    const mockEvent = mockFile1;

    // Act
    component.onRemove(mockEvent);

    // Assert
    expect(component.files).toEqual([mockFile2]);
  });
});
