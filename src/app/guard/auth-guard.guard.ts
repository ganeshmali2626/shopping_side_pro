import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private localDetails: LocalStorageServiceService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.localDetails.getData() === null) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }

}



@Injectable({
  providedIn: 'root',
})
export class AuthGuardlogin implements CanActivate {
  xyz: any = JSON.parse(localStorage.getItem('login')!);

  constructor(
    private router: Router,
    private localDetails: LocalStorageServiceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.localDetails.getData() === null) {
      return true;
    } else {
      this.router.navigate(['/home/myprofile']);
      return false;
    }
  }
}




