import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCart, addOneCart, addOneTotal, addTotal } from 'src/app/cart-state-management/cart.action';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  name1: string = '';
  role1: string = '';
  sortBy: string = '';
  limit: number = 8;
  page: number = 1;
  totalpages!: number;
  url = `/shop/products?limit=${this.limit}&page=${this.page}`;
  products: any;
  oneProduct: { deliveryFee: number, items: any, total: number } = {
    deliveryFee:50,
      items:[],
      total:0
  };
  constructor(private http: ApiServiceService, private rout: Router,private store:Store<{state:any}>) {

  }
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.http.getData(this.url).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        this.totalpages = res.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // temp(data: string) {
  //   this.rout.navigate(['/shop/products/one-product'], { state: { example: data } });
  // }

  sortByData(data: any) {
    console.log(data);
    this.sortBy = data;
    this.url = `/shop/products?limit=${this.limit}&page=${this.page}&sortBy=${this.sortBy}`;
    this.getUserData();
  }
  serchValue(data: any) {
    if (data !== '') {
      console.log(data);
      this.name1 = data;
      this.url = `/shop/products?limit=${this.limit}&page=${this.page}&name=${this.name1}`;
      this.getUserData();
    } else {
      this.url = `/shop/products?limit=${this.limit}&page=${this.page}`;
      this.getUserData();
    }
  }
  previousPage() {
    this.page--;
    this.url = `/shop/products?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  nextPage() {
    this.page++;
    this.url = `/shop/products?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  handleLimit(data: any) {
    this.limit = data;
    this.url = `/shop/products?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }

  add(data:any) {
    data.qty=1;
    data.subTotal=data.price;
    data['productId'] = data['_id'];
    this.store.dispatch(addCart({productData:data}));
    this.store.dispatch(addTotal());
  }

  buyNow(data:any){
    data.qty=1;
    data.subTotal=data.price
    data['productId'] = data['_id'];
    console.log(data);
    this.store.dispatch(addOneCart({dataInfo11:data}));
    this.store.dispatch(addOneTotal());

    this.rout.navigate(['/shop/customers/creat-order']);
  }




}
