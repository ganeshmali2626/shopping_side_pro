import { TestBed } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }]
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should delete data from the server', () => {
    const url = '/api/data/1';
    service.deleteData(url).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(service.baseUrl + url);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update data on the server', () => {
    const url = '/api/data/1';
    const data = { name: 'updated data' };
    service.putData(url, data).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(service.baseUrl + url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });
});
