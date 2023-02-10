import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css'],
})
export class OneProductComponent implements OnInit {
  productId!: string;
  productData: any;
  URL: any;
  img:File[]=[]
  deletImg:any=[]
  data = new FormData();
  constructor(private router: Router, private http: ApiServiceService,private toastr: ToastrService) {
    console.log(this.router.getCurrentNavigation()?.extras?.state?.['example']); // should log out 'bar'
    this.productId =
      this.router.getCurrentNavigation()?.extras?.state?.['example'];
    this.URL = this.productData?.images[0]?.url;
  }

  CreateProduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(){
    console.log(this.productId);

    this.http.getData(`/products/${this.productId}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  imageUrl(url: any) {
    console.log(url.target.currentSrc);
    this.URL = url.target.currentSrc;
  }
  deleteProduct() {
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
        this.http.deleteData(`/products/${this.productId}`).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.router.navigate(['/products/product-list']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
  collection(){
    this.http
    .patchData(`/products/${this.productId}`, this.CreateProduct.value)
    .subscribe({
      next: (res) => {
        this.CreateProduct.reset();
        this.getUserData();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Somthing Wrong!');
      },
    });
  }
  setvalue(){
    this.CreateProduct.reset({
      name: this.productData.name,
      description: this.productData.description,
      price: this.productData.price,
    });

}
ImageUpload(event: any): void {
  let temp = event.target.files;
  for (let i = 0; i < event.target.files.length; i++) {
    this.img.push(temp[i]);
    };
}

getImage(data:any){
  console.log(data);
  this.deletImg.push(data)

  this.http
    .patchData(`/products/images/${this.productId}`, {delete: data})
    .subscribe({
      next: (res) => {
        this.getUserData();
        this.img=[];
        this.deletImg=[]
      },
      error: (err) => {
        console.log(err);

        this.toastr.error(err.error.message, 'Somthing Wrong!');
      },
    });
}
close(){
this.img=[];
this.deletImg=[]
}
save(){
  console.log("hello");

  for (let i = 0; i < this.img.length; i++) {
    this.data.append('new_images', this.img[i]);
  }
  this.http
    .patchData(`/products/images/${this.productId}`, this.data)
    .subscribe({
      next: (res) => {
        this.getUserData();
        this.img=[];
        this.deletImg=[]
      },
      error: (err) => {
        console.log(err);

        this.toastr.error(err.error.message, 'Somthing Wrong!');
      },
    });

}



  get name1() {
    return this.CreateProduct.get('name');
  }
  get description() {
    return this.CreateProduct.get('description');
  }
  get price() {
    return this.CreateProduct.get('price');
  }

}

