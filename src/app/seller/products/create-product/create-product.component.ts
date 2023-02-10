import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productImg: any = [];
  img: File[] = [];
  nprice: any = 0;
  data = new FormData();
  constructor(
    private router: Router,
    private http: ApiServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  CreateProduct = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    images: ['', [Validators.required]],
    price: [, [Validators.required]],
  });
  CreatePro() {
    for (let i = 0; i < this.img.length; i++) {
      this.data.append('images', this.img[i]);
    }
    this.data.append('description', `${this.CreateProduct.value.description}`);
    this.data.append('name', `${this.CreateProduct.value.name}`);
    this.data.append('price', `${this.CreateProduct.value.price}`);

    this.http.postData('/products', this.data).subscribe({
      next: (res: any) => {
        this.toastr.success('ADD', 'Successfully!');
        this.CreateProduct.reset({});
        console.log(res);
        this.productImg = [];
        this.img = [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ImageUpload(event: any): void {
    let temp = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      this.img.push(temp[i]);
      var reder = new FileReader();
      reder.readAsDataURL(event.target.files[i]);
      reder.onload = (data: any) => {
        this.productImg.push(data.target.result);
      };
    }
  }

  ngOnInit(): void {}
  get name() {
    return this.CreateProduct.get('name');
  }
  get description() {
    return this.CreateProduct.get('description');
  }
  get price() {
    return this.CreateProduct.get('price');
  }
}
