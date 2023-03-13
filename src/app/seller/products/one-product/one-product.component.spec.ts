import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneProductComponent } from './one-product.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('OneProductComponent', () => {
  let component: OneProductComponent;
  let fixture: ComponentFixture<OneProductComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
