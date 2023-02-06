import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

   captcha!:string;
  constructor(private recaptcha: ReCaptchaV3Service) { }

  getCaptcha():any{
    this.recaptcha.execute('importantAction').subscribe((token: any) => { 
      this.captcha=token;

     });
     console.log(this.captcha);
     
     return this.captcha;
  }
  
}
