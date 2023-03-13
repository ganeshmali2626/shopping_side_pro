import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassworComponent } from './forgot-passwor.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForgotPassworComponent', () => {
  let component: ForgotPassworComponent;
  let fixture: ComponentFixture<ForgotPassworComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }]
  }));
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPassworComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassworComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
