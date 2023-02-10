import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { dontAllowVoidSpaces } from 'src/app/shared/validators';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected aFormGroup!: FormGroup;
  token!: string;
  stoken: any;
  socialAuthService: any;
  constructor(
    private router: Router,
    private http: ApiServiceService,
    private localDetails: LocalStorageServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private recaptcha: ReCaptchaV3Service,
    private authService: SocialAuthService
  ) {}

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, dontAllowVoidSpaces]),
    captcha: new FormControl(''),
  });

  loginUser() {
    this.http.postData(`/auth/login?captcha=true`, this.login.value).subscribe({
      next: (res: any) => {
        console.log(res.token);
        this.localDetails.setData(res.token);
        this.router.navigate(['/products/product-list']);
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Something Wrong!');
      },
    });
  }

  get email() {
    return this.login.get('email');
  }
  get password() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
    return this.login.get('password');
  }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      if (this.token) {
        if (user.idToken) {
          this.stoken = user.idToken;

          this.googleSignIn();
        }
      }
    });
    this.captchaa();
  }
  signOut(): void {
    this.localDetails.removeData();
    this.authService
      .signOut()
      .then((data) => {
        this.router.navigate(['login']);
      })
      .catch((data) => {});
  }
  captchaa() {
    this.recaptcha.execute('importantAction').subscribe((token: string) => {
      this.token = token;
      this.login.get('captcha')?.setValue(token);
    });
  }
  googleSignIn() {
    this.http
      .postData('/auth/login/google', {
        token: this.stoken,
        captcha: this.token,
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('login', JSON.stringify(res.token)),
            this.router.navigate(['products/product-list']);
        },
        error: (err) => {
          this.signOut();
          console.log(err);
        },
      });
  }
}
function removeData() {
  throw new Error('Function not implemented.');
}
