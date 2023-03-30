import { AbstractControl } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';


export function dontAllowVoidSpaces(controls: AbstractControl) {
  if (controls && controls.value.trim() === '') {
    console.log(controls.value);

    return { isVoidSpace: true };
  } else {
    return null;
  }
}

// export function captchaGeneration( recaptcha: ReCaptchaV3Service) :string {
//  let capcha='';
//  recaptcha.execute('importantAction').subscribe((token: string) => {
//    capcha=token
//   });
//   return capcha
// }
