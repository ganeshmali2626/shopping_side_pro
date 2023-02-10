import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  passToken: any;
  protected aFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private http: ApiServiceService,
    private toastr: ToastrService,
    private recaptcha: ReCaptchaV3Service,
    private route: ActivatedRoute
  ) {}

  reset = new FormGroup({
    password: new FormControl('', [Validators.required]),
    // token: new FormControl(''),
    captcha: new FormControl(''),
  });

  loginUser() {
    console.log(this.reset.value);
    delete this.reset.value.captcha;
    //  delete this.reset.value.token;

    this.http
      .postData(
        `/auth/reset-password?token=${this.passToken}`,
        this.reset.value
      )
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/auth/login']);
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Something Wrong!');
          console.log(err);
        },
      });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.passToken = params.token;
      // this.reset.get('token')?.setValue(params.token);
    });
    this.captchaa();
  }
  captchaa() {
    this.recaptcha.execute('importantAction').subscribe((token: string) => {
      this.reset.get('captcha')?.setValue(token);
    });
  }
  get Password() {
    return this.reset.get('password');
  }
}
