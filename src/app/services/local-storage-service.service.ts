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
}
