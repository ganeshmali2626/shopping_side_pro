import { TestBed } from '@angular/core/testing';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CaptchaService } from './captcha.service';

describe('CaptchaService', () => {
  let service: CaptchaService;

  beforeEach(() =>{
     TestBed.configureTestingModule({
    imports: [ RecaptchaV3Module],
    providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],

  })});

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
