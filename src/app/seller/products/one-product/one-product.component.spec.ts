import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneProductComponent } from './one-product.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
describe('OneProductComponent', () => {
  let component: OneProductComponent;
  let fixture: ComponentFixture<OneProductComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneProductComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the URL property to the current source', () => {
    // Arrange
    const expectedSrc = 'https://example.com/image.jpg';
    const mockEvent = { target: { currentSrc: expectedSrc } };

    // Act
    component.imageUrl(mockEvent);

    // Assert
    expect(component.URL).toBe(expectedSrc);
  });

  it('should add files to the img property when called with valid input', () => {
    // Arrange
    const mockEvent = { target: { files: [new File([], 'test.jpg')] } };

    // Act
    component.ImageUpload(mockEvent);

    // Assert
    expect(component.img.length).toBe(1);
    expect(component.img[0].name).toBe('test.jpg');
  });

  it('should not modify the img property when called with no files', () => {
    // Arrange
    const mockEvent = { target: { files: [] } };
    component.img = [new File([], 'test.jpg')];

    // Act
    component.ImageUpload(mockEvent);

    // Assert
    expect(component.img.length).toBe(1);
    expect(component.img[0].name).toBe('test.jpg');
  });


  it('should add the given data to deletImg property', () => {
    // Arrange
    const testData = 'test-image-url';

    // Act
    component.getImage(testData);

    // Assert
    expect(component.deletImg.length).toBe(1);
    expect(component.deletImg[0]).toBe(testData);
  });

  it('should make an HTTP request to delete the image and reset properties', () => {
    // Arrange
    const testData = 'test-image-url';
    const mockResponse = { success: true };

    // Act
    component.getImage(testData);

    const req = httpMock.expectOne(`https://shop-api.ngminds.com/products/images/undefined`);
    req.flush(mockResponse);

    // Assert
    expect(component.img.length).toBe(0);
    expect(component.deletImg.length).toBe(0);
  });


  it('should send a PATCH request to the server to update images', () => {
    spyOn(component, 'getUserData');
    spyOn(console, 'log');
    spyOn(component['toastr'], 'error');
    component.save();

    const req = httpMock.expectOne(`https://shop-api.ngminds.com/products/images/undefined`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body.get('new_images')).toEqual(null);
    expect(req.request.body.get('new_images')).toEqual(null);

    const mockResponse = { success: true };
    req.flush(mockResponse);

    expect(component.getUserData).toHaveBeenCalled();
    expect(component.img).toEqual([]);
    expect(component.deletImg).toEqual([]);
    expect(console.log).toHaveBeenCalledWith('hello');
    expect(component['toastr'].error).not.toHaveBeenCalled();
  });


  it('should retrieve product data', () => {
    // Set up the test data
    const mockProductData = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      price: 10.99,
    };
    const productId = '123';

    // Call the getUserData function
    component.productId = productId;
    component.getUserData();

    // Expect a GET request to be sent to the correct URL
    const req = httpMock.expectOne(`https://shop-api.ngminds.com/products/${productId}`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock data
    req.flush(mockProductData);

    // Expect the productData variable to be set to the mock data
    expect(component.productData).toEqual(mockProductData);
  });

  it('should handle errors', () => {
    // Set up the test data
    const productId = '456';

    // Call the getUserData function
    component.productId = productId;
    component.getUserData();

    // Expect a GET request to be sent to the correct URL
    const req = httpMock.expectOne(`https://shop-api.ngminds.com/products/${productId}`);
    expect(req.request.method).toEqual('GET');

    // Respond with an error
    const errorMessage = 'Error retrieving product data';
    req.error(new ErrorEvent('Error', { error: errorMessage }));


  });


  it('should update product data and reset the form', () => {
    // Set up the test data
    const productId = '123';
    const formData = {
      name: '',
      description: '',
      price: '',
    };

    // Call the collection function
    component.productId = productId;
    // component.CreateProduct.setValue(formData);
    component.collection();

    // Expect a PATCH request to be sent to the correct URL with the correct data
    const req = httpMock.expectOne(`https://shop-api.ngminds.com/products/${productId}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(formData);

    // Respond with a success status and verify that the form is reset and getUserData is called
    req.flush(null, { status: 204, statusText: 'No Content' });
    expect(component.CreateProduct.value).toEqual({
      name: null,
      description: null,
      price: null,
    });
    // expect(component.getUserData).toHaveBeenCalled();
  });

  it('should handle errors and show a toastr error message', () => {
    // Set up the test data
    const productId = '456';
    const errorMessage = 'Error updating product data';

    // Call the collection function
    component.productId = productId;
    component.collection();

    // Expect a PATCH request to be sent to the correct URL
    const req = httpMock.expectOne(`https://shop-api.ngminds.com/products/${productId}`);
    expect(req.request.method).toEqual('PATCH');

    // Respond with an error and verify that a toastr error message is shown
    req.error(new ErrorEvent('Error', { error: { message: errorMessage } }));
  });

  it('should clear the img and deletImg arrays', () => {
    // Set up the initial values of the arrays
    const file = new File(['image'], 'image1.png', { type: 'image/png' });
    component.deletImg = ['image3.png'];

    // Call the close function
    component.close();

    // Expect the arrays to be empty
    expect(component.img).toEqual([]);
    expect(component.deletImg).toEqual([]);
  });
});
