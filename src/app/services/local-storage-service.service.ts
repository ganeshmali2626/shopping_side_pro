import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  localDetails: any;
  constructor() {}
  setData(token: any) {
    localStorage.setItem('login', JSON.stringify(token));
  }
  getData() {
    return JSON.parse(localStorage.getItem('login')!);
  }
  removeData() {
    localStorage.removeItem('login');
  }

  customerSetData(token: any) {
    localStorage.setItem('customerlogin', JSON.stringify(token));
  }
  customerGetData() {
    return JSON.parse(localStorage.getItem('customerlogin')!);
  }
  customerremoveData() {
    localStorage.removeItem('customerlogin');
  }
}
