import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(
    private rout: Router,
    private http: ApiServiceService,
    private toastr: ToastrService,
    private recaptcha: ReCaptchaV3Service,

  ) {}
  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    captcha: new FormControl('')
  });

  collection() {

    this.http
      .postData('/auth/register?captcha=true', this.register.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('Registered .', 'Successfully!');
          this.register.reset({
            name: '',
            company: '',
            email: '',
            password: '',
          });
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
        },
      });


  }
  ngOnInit(): void {
    this.captchaa();
  }
  captchaa() {
    this.recaptcha.execute('importantAction').subscribe((token: string) => {
      this.register.get('captcha')?.setValue(token)
      // console.log(this.register.value.captcha);


    });
  }
  get name() {
    return this.register.get('name');
  }
  get companyname() {
    return this.register.get('company');
  }
  get email() {
    return this.register.get('email');
  }
  get Password() {
    return this.register.get('password');
  }
}
