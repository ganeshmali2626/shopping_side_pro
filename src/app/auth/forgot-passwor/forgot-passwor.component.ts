import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-forgot-passwor',
  templateUrl: './forgot-passwor.component.html',
  styleUrls: ['./forgot-passwor.component.css'],
})
export class ForgotPassworComponent implements OnInit {
  protected aFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private http: ApiServiceService,
    private toastr: ToastrService,
    private recaptcha: ReCaptchaV3Service
  ) {}

  forget = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    captcha: new FormControl(''),
  });

  loginUser() {
    console.log(this.forget.value);

    this.http.postData('/auth/forgot-password', this.forget.value).subscribe({
      next: (res: any) => {
        this.router.navigate(['/auth/reset-password']);
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Something Wrong!');
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.captchaa();
  }
  captchaa() {
    this.recaptcha.execute('importantAction').subscribe((token: string) => {
      this.forget.get('captcha')?.setValue(token);
    });
  }
  get email() {
    return this.forget.get('email');
  }
}
