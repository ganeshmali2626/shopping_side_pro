import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  editor!: Editor;
  productImg: any = [];
  nprice: any = 0;
  data = new FormData();
  files: File[] = [];

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
    for (let i = 0; i < this.files.length; i++) {
      this.data.append('images', this.files[i]);
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
        this.files = [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  ngOnInit(): void {
    this.editor = new Editor();
  }

  get name() {
    return this.CreateProduct.get('name');
  }
  get description() {
    return this.CreateProduct.get('description');
  }
  get price() {
    return this.CreateProduct.get('price');
  }

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
