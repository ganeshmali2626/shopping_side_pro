import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';

import { MainNavComponent } from './main-nav.component';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear user data and navigate to products page on logout', () => {
    // Mock the logoutUser service
    const logoutUser = TestBed.inject(LocalStorageServiceService);
    spyOn(logoutUser, 'customerremoveData').and.stub();

    // Mock the router
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.stub();

    // Create a component instance and call the logout function
    const component = fixture.componentInstance;
    component.logout();

    // Expect that the customerremoveData function was called on the logoutUser service
    expect(logoutUser.customerremoveData).toHaveBeenCalled();

    // Expect that the router navigate function was called with the '/shop/products' route
    expect(router.navigate).toHaveBeenCalledWith(['/shop/products']);

    // Expect that the navData property was set to true
    expect(component.navData).toBeTrue();
  });



  it('should not call logout() when cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false); // override window.confirm to always return false
    spyOn(component, 'logout'); // spy on logout method to check if it's called

    component.alertfun();

    expect(component.logout).not.toHaveBeenCalled();
  });
});
