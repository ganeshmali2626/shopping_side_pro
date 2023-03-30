import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let logoutUserService: LocalStorageServiceService;
  let logoutUserSpy: jasmine.SpyObj<LocalStorageServiceService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [ LocalStorageServiceService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    logoutUserService = TestBed.inject(LocalStorageServiceService);
    logoutUserSpy = TestBed.inject(LocalStorageServiceService) as jasmine.SpyObj<LocalStorageServiceService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should handle Swal error', () => {
    spyOn(component['logoutUser'], 'removeData');
    spyOn(component['rout'], 'navigate');

    component.alertfun();

    expect(component['logoutUser'].removeData).not.toHaveBeenCalled();
    expect(component['rout'].navigate).not.toHaveBeenCalled();
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



    // Expect that the router navigate function was called with the '/shop/products' route
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);

    
  });



  it('should not call logout() when cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false); // override window.confirm to always return false
    spyOn(component, 'logout'); // spy on logout method to check if it's called

    component.alertfun();

    expect(component.logout).not.toHaveBeenCalled();
  });
});
