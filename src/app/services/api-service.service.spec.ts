import { TestBed } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiServiceService', () => {
  let service: ApiServiceService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }]
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
