import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,StoreModule.forRoot({}),RouterTestingModule, FormsModule,
      ReactiveFormsModule, RecaptchaV3Module,ToastrModule.forRoot() ],
    providers: [ApiServiceService,Store,{provide: ToastrService, useClass: ToastrService},{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha }],
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
