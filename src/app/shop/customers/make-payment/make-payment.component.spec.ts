import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentComponent } from './make-payment.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
describe('MakePaymentComponent', () => {
  let component: MakePaymentComponent;
  let fixture: ComponentFixture<MakePaymentComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,StoreModule.forRoot({}),RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,Store,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
