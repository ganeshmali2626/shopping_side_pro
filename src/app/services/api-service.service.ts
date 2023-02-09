import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) {}
  baseUrl = 'https://shop-api.ngminds.com';

  postData(finalUrl: string, data: any) {
    return this.http.post(this.baseUrl + finalUrl, data)

  }
  getData(finalUrl: string) {
    return this.http.get(this.baseUrl + finalUrl);
  }
  patchData(finalUrl:any,data:any) {
    return this.http.patch(this.baseUrl + finalUrl, data);
  }
  deleteData(finalUrl:any) {
    return this.http.delete(this.baseUrl + finalUrl);
  }
}
