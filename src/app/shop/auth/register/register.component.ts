import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addressShow:any;
  constructor(
    private rout: Router,
    private http: ApiServiceService,
    private toastr: ToastrService,

  ) {}
  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    address : new FormGroup({
      street: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
      city: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      })
  });

  get getAddress() {
    return this.register.controls['address'] as FormGroup;
  }

  collection() {
    console.log(this.register.value);


    this.http
      .postData('/shop/auth/register', this.register.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('Registered .', 'Successfully!');
          this.register.reset({});
          this.getAddress.reset({});
          this.addressShow=''
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
        },
      });


  }
  ngOnInit(): void {
  }

  address(){
    this.addressShow =Object.values(this.getAddress.value);

  }
  get name() {
    return this.register.get('name');
  }
  get email() {
    return this.register.get('email');
  }
  get Password() {
    return this.register.get('password');
  }
}
