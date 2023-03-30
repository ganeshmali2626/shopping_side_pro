import { async, TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

import {
  AuthGuardGuard,
  AuthGuardlogin,
  CustomerAuthGuardGuard,
  CustomerAuthGuardlogin,
} from './auth-guard.guard';

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;
  let authGuard: AuthGuardlogin;
  let authGuardCustom: CustomerAuthGuardGuard;
  let authGuardCustomlogin: CustomerAuthGuardlogin;
  let localDetailsService: LocalStorageServiceService;
  let router: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuardGuard,
        AuthGuardlogin,
        CustomerAuthGuardlogin,
        CustomerAuthGuardGuard,
        LocalStorageServiceService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardGuard);
    authGuard = TestBed.inject(AuthGuardlogin);
    authGuardCustom = TestBed.inject(CustomerAuthGuardGuard);
    authGuardCustomlogin = TestBed.inject(CustomerAuthGuardlogin);
    localDetailsService = TestBed.inject(LocalStorageServiceService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false and navigate to /auth/login when localDetails.getData() is null', () => {
    spyOn(localDetailsService, 'getData').and.returnValue(null);
    spyOn(router, 'navigate');
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = guard.canActivate(route, state);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should return true when localDetails.getData() is not null', () => {
    spyOn(localDetailsService, 'getData').and.returnValue('some data');
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = guard.canActivate(route, state);
    expect(result).toBeTrue();
  });

  it('should return true when localDetails.getData() is not null', () => {
    spyOn(localDetailsService, 'getData').and.returnValue(null);
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = authGuard.canActivate(route, state);
    expect(result).toBeTrue();
  });

  it('should return false and navigate to /home/myprofile when localDetails.getData() is null', () => {
    spyOn(localDetailsService, 'getData').and.returnValue('some data');
    spyOn(router, 'navigate');
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = authGuard.canActivate(route, state);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home/myprofile']);
  });

  it('should return false and navigate to /auth/login when localDetails.getData() is null', () => {
    spyOn(localDetailsService, 'customerGetData').and.returnValue(null);
    spyOn(router, 'navigate');
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = authGuardCustom.canActivate(route, state);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['shop/auth/login']);
  });

  it('should return true when localDetails.getData() is not null', () => {
    spyOn(localDetailsService, 'customerGetData').and.returnValue('some data');
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = authGuardCustom.canActivate(route, state);
    expect(result).toBeTrue();
  });

  it('should return true when localDetails.getData() is not null', () => {
    spyOn(localDetailsService, 'customerGetData').and.returnValue(null);
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = authGuardCustomlogin.canActivate(route, state);
    expect(result).toBeTrue();
  });

  it('should return false and navigate to /home/myprofile when localDetails.getData() is null', () => {
    spyOn(localDetailsService, 'customerGetData').and.returnValue('some data');
    spyOn(router, 'navigate');
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result:
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree = authGuardCustomlogin.canActivate(route, state);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/shop/products']);
  });
});
