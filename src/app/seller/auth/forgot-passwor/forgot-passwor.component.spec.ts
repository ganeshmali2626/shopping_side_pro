import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassworComponent } from './forgot-passwor.component';

describe('ForgotPassworComponent', () => {
  let component: ForgotPassworComponent;
  let fixture: ComponentFixture<ForgotPassworComponent>;

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
