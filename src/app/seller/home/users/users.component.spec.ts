import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { Operator, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
    declarations: [NavbarComponent],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['postData']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
expect(req1.request.method).toEqual('GET');

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should set editId on calling getEditId()', () => {
    const id = '12345';
    component.getEditId(id);
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
expect(req1.request.method).toEqual('GET');

    expect(component.editId).toEqual(id);
  });



  it('should decrement page and call getUserData() on calling previousPage()', () => {
    component.page = 3;

    const spy = spyOn(component, 'getUserData').and.callThrough();

    component.previousPage();

    expect(component.page).toEqual(2);
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
expect(req1.request.method).toEqual('GET');

const req2 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=2');
expect(req2.request.method).toEqual('GET');
    expect(spy).toHaveBeenCalled();
  });

  it('should increment page and call getUserData() on calling nextPage()', () => {
    component.page = 3;

    const spy = spyOn(component, 'getUserData').and.callThrough();

    component.nextPage();

    expect(component.page).toEqual(4);
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
expect(req1.request.method).toEqual('GET');

const req2 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=4');
expect(req2.request.method).toEqual('GET');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });



  it('should set role1 and call getUserData() on calling roleSortby()', () => {
    const data = 'admin';

    const spy = spyOn(component, 'getUserData').and.callThrough();

    component.roleSortby(data);

    expect(component.role1).toEqual(data);
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
expect(req1.request.method).toEqual('GET');

const req2 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1&role=admin');
expect(req2.request.method).toEqual('GET');
    expect(spy).toHaveBeenCalled();
  });

  it('should set sortBy and call getUserData() on calling sortByData()', () => {
    const data = 'name';

    const spy = spyOn(component, 'getUserData').and.callThrough();

    component.sortByData(data);

    expect(component.sortBy).toEqual(data);
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
expect(req1.request.method).toEqual('GET');

const req2 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1&sortBy=name');
expect(req2.request.method).toEqual('GET');
    expect(spy).toHaveBeenCalled();
  });



  it('should call http.patchData() on calling editRole()', () => {
    component.editId = '12345';
    component.role = 'admin';

    const spy = spyOn(component['http'], 'patchData').and.callThrough();
    const mockResponse = { message: 'Role updated successfully' };

    component.editRole();


    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req1.request.method).toEqual('GET');

    const req2 = httpTestingController.expectOne('https://shop-api.ngminds.com/users/role/12345');
    expect(req2.request.method).toEqual('PATCH');





    expect(spy).toHaveBeenCalled();
  });

    it('should set limit and call getUserData() on calling handleLimit()', () => {
    const data = 10;

    const spy = spyOn(component, 'getUserData').and.callThrough();

    component.handleLimit(data);

    expect(component.limit).toEqual(data);
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req1.request.method).toEqual('GET');

  const req2 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=10&page=1');
  expect(req2.request.method).toEqual('GET');
    expect(spy).toHaveBeenCalled();
  });


  it('should update name1 and url variables when searchValue is called with a non-empty string', () => {
    const data = 'John Doe';

    component.serchValue(data);

    expect(component.name1).toEqual(data);
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req1.request.method).toEqual('GET');
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1&name=John Doe');
    expect(req.request.method).toEqual('GET');


  });


  it('should call http.postData() on calling collection()', () => {
    const spy = spyOn(component['http'], 'postData').and.callThrough();

    component.collection();
    const req1 = httpTestingController.expectOne('https://shop-api.ngminds.com/users');
    expect(req1.request.method).toEqual('POST');
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');

    expect(spy).toHaveBeenCalled();
  });


  it('should reset the register form when flag is false', () => {
    // Set flag to false
    component.togglemodalforEditUser(false);

    // Check that the register form is reset
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');
    expect(component.register.value).toEqual({ name: null, email: null, password: null, role: null });
  });

  it('should set the validator for role when flag is true', () => {
    // Set flag to true
    component.togglemodalforEditUser(true);


    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');
  });

  it('should reset the register form and set data when data is provided', () => {
    // Set data
    const data = { _id: '123', name: 'John', email: 'john@example.com' };

    // Call function with flag and data
    component.togglemodalforEditUser(true, data);

    // Check that the register form is reset and data is set
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');
    expect(component.register.value).toEqual({ name: 'John', email: 'john@example.com', password: '', role: null });
    expect(component.IdToEdit).toEqual('123');
  });




  it('should not delete the user if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const getUserDataSpy = spyOn(component, 'getUserData');

    component.deleteUser('123');

    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');
    expect(getUserDataSpy).not.toHaveBeenCalled();
  });


  it('should return the role control from the form', () => {
    // arrange
    const expected = component.register.get('role');

    // act
    const actual = component.Role;
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');

    // assert
    expect(actual).toBe(expected);
  });


  it('should get user data', () => {
    spyOn(component['http'], 'getData').and.returnValue(of({ totalPages: 2, results: ['user1', 'user2'] }));
    component.getUserData();
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');
    expect(component.usersData).toEqual({ totalPages: 2, results: ['user1', 'user2'] });
    expect(component.totalpages).toEqual(2);
    expect(component.userList).toEqual(['user1', 'user2']);
  });

  it('should register user and get user data', () => {
    spyOn(component['http'], 'postData').and.returnValue(of({}));
    spyOn(component['toastr'], 'success');
    spyOn(component, 'getUserData');
    component.register.setValue({
      name: 'John', email: 'john@example.com',
      role: null,
      password: null
    });
    component.collection();
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');
    expect(component['toastr'].success).toHaveBeenCalledWith('Registered .', 'Successfully!');
    expect(component.paginationData).toEqual({});
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should edit user data', () => {
    spyOn(component['http'], 'patchData').and.returnValue(of({}));
    spyOn(component, 'getUserData');
    component.IdToEdit = '';
    component.register.setValue({
      name: 'John', email: 'john@example.com',
      role: null,
      password: null
    });
    component.editUserData();
    const req = httpTestingController.expectOne('https://shop-api.ngminds.com/users?limit=5&page=1');
    expect(req.request.method).toEqual('GET');
    expect(component.register.value).toEqual({ name:null, email: null,role: null,
    password: null });
    expect(component['http'].patchData).toHaveBeenCalledWith('/users/', Object({ name: 'John', email: 'john@example.com', password: null }));
    expect(component.getUserData).toHaveBeenCalled();
  });


});
