import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyprofileComponent implements OnInit {
  userDetails: any;
  constructor(
    private httpdata: ApiServiceService,
    private rout: Router,
    private toastr: ToastrService
  ) {}
  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  password = new FormGroup({
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.displayCompanyInfo();
  }

  displayCompanyInfo() {
    this.httpdata.getData('/auth/self').subscribe({
      next: (res) => {
        console.log(res);
        this.userDetails = res;
      },
      error: (err) => {
        this.rout.navigate(['/auth/login']);
        console.log(err);
      },
    });
  }
  collection() {
    this.httpdata.patchData('/users/org', this.register.value).subscribe({
      next: (res) => {
        this.toastr.success('Registered .', 'Successfully!');
        this.register.reset();
        console.log(res);
        this.displayCompanyInfo();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Somthing Wrong!');
      },
    });
  }
  forgetPassword() {
    this.httpdata
      .postData('/users/auth/change-password', this.password.value)
      .subscribe({
        next: (res) => {
          this.password.reset();
          this.toastr.success('Password Has Been Changed', 'Successfully!');
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
          console.log(err);
        },
      });
  }
  verifyAccount() {
    if (!this.userDetails?.isEmailVerified) {
      this.httpdata.postData('/auth/send-verification-email', '').subscribe({
        next: (res) => {
          console.log(res);
          this.rout.navigate(['auth/verify-email']);

          // this.toastr.success('Password Has Been Changed', 'Successfully!');
        },
        error: (err) => {
          // this.toastr.error(err.error.message, 'Somthing Wrong!');
          console.log(err);
        },
      });
    }
  }
  get name() {
    return this.register.get('name');
  }
  get email() {
    return this.register.get('email');
  }

  get old_password() {
    return this.password.get('old_password');
  }
  get new_password() {
    return this.password.get('new_password');
  }
}
