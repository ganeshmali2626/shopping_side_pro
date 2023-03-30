import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set addressShow to an array of address values', () => {
    // create a new instance of the component
    // const component = new MyComponent();

    // set up test data
    component.getAddress.setValue({
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      pin: '12345',
      addressLine2:''
    });

    // call the function to be tested
    component.address();

    // assert that addressShow was set correctly
    expect(component.addressShow).toEqual(['123 Main St', '', 'Anytown', '12345','CA']);
  });


  it('should call http.postData and toastr.success with the correct parameters', () => {
    // create a new instance of the component
    // const component = new MyComponent();

    // set up spy objects
    const httpSpy = spyOn(component['http'], 'postData').and.returnValue(of({}));
    const toastrSpy = spyOn(component['toastr'], 'success');

    // set up test data
    component.register.setValue({
      name: '',
      email: '',
      password: '',
      address: component.getAddress.value
    });
    component.getAddress.setValue({
      street: '',
      city: '',
      state: '',
      pin: '',
      addressLine2:''
    });

    // call the function to be tested
    component.collection();


    expect(toastrSpy).toHaveBeenCalledWith('Registered .', 'Successfully!');

    expect(component.addressShow).toBe('');
  });
});
