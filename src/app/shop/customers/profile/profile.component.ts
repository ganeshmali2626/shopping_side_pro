import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  userAddress: any;
  editadd:any;
  deletImg: any;
  photo:any
  profile: string = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';

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

  getAddress = new FormGroup({
    street: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    pin: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  });
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
  this.photo= base64ToFile(this.croppedImage)

}

  address() {
    if(this.editadd==undefined)
    {
    this.httpdata
      .postData('/customers/address', this.getAddress.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('Added .', 'Successfully!');
          this.displayInfo();
          this.getAddress.reset({});
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
        },
      });
    }else{
      this.httpdata
      .putData(`/customers/address/${this.editadd._id}`, this.getAddress.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('Updated .', 'Successfully!');
          this.displayInfo();
          this.getAddress.reset({});
          this.editadd=undefined;
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
        },
      });
    }
  }
  close(){
    this.editadd=undefined;
  }
  ngOnInit(): void {
    this.displayInfo();
  }

  displayInfo() {
    this.httpdata.getData('/shop/auth/self').subscribe({
      next: (res) => {
        console.log(res);
        this.userDetails = res;
        this.croppedImage = this.userDetails.picture;
      },
      error: (err) => {
        this.rout.navigate(['/shop/auth/login']);
        console.log(err);
      },
    });
    this.httpdata.getData('/customers/address').subscribe({
      next: (res) => {
        console.log(res);
        this.userAddress = res;
        console.log(this.userAddress);

      },
      error: (err) => {
        this.rout.navigate(['/shop/auth/login']);
        console.log(err);
      },
    });
  }

  collection() {
    this.httpdata
      .patchData('/customers/update-profile', this.register.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('Registered .', 'Successfully!');
          this.register.reset();
          console.log(res);
          this.displayInfo();
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
        },
      });
  }
  editAccount(){
    this.register.controls['name'].setValue(this.userDetails.name);
    this.register.controls['email'].setValue(this.userDetails.email);
  }
  forgetPassword() {
    this.httpdata
      .postData('/customers/auth/change-password', this.password.value)
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

  saveImg() {
    let data = new FormData();
    data.append('picture',this.photo);
    this.httpdata.postData('/customers/profile-picture', data).subscribe({
      next: (res) => {
        console.log(res);
        this.photo=""
        this.displayInfo();
        this.profile = '';
        this.imageChangedEvent = '';
  this.croppedImage=""
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Somthing Wrong!');
        console.log(err);
      },
    });
  }
  // ImageUpload(event: any) {
  //   this.data.append('picture', event.target.files[0]);
  //   var reder = new FileReader();
  //   reder.readAsDataURL(event.target.files[0]);
  //   reder.onload = (data: any) => {
  //     this.deletImg = data.target.result;
  //   };
  // }
  removeProfile() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpdata.deleteData(`/customers/profile-picture`).subscribe({
          next: (res: any) => {
            console.log(res);
            this.displayInfo();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
  deleteAccount() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpdata.deleteData(`/customers/account`).subscribe({
          next: (res: any) => {
            console.log(res);
            this.rout.navigate(['/shop/products']);
            Swal.fire('Deleted!', 'Your Account has been deleted.', 'success');
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
  editAddress(data:any){
    this.editadd=data;
    this.getAddress.controls['street'].setValue(this.editadd.street);
    this.getAddress.controls['state'].setValue(this.editadd.state);
    this.getAddress.controls['pin'].setValue(this.editadd.pin);
    this.getAddress.controls['city'].setValue(this.editadd.city);
    this.getAddress.controls['addressLine2'].setValue(this.editadd.addressLine2);
    console.log(this.editadd._id);


  }
  deleteAddress(data:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpdata.deleteData(`/customers/address/${data._id}`).subscribe({
          next: (res: any) => {
            console.log(res);
            this.displayInfo();
            Swal.fire('Deleted!', 'Your Address has been deleted.', 'success');
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });

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
