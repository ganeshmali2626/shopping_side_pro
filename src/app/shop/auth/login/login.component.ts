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
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  protected aFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private http: ApiServiceService,
    private localDetails: LocalStorageServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {}

  loginpage = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, dontAllowVoidSpaces]),
  });

  loginCustemer() {
    this.http.postData(`/shop/auth/login`, this.loginpage.value).subscribe({
      next: (res: any) => {
        console.log(res.token);
        this.localDetails.customerSetData(res.token);
        this.router.navigate(['/shop/products']);
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Something Wrong!');
      },
    });
  }

  get email() {
    return this.loginpage.get('email');
  }
  get password() {
    return this.loginpage.get('password');
  }
  ngOnInit(): void {

  }

}
