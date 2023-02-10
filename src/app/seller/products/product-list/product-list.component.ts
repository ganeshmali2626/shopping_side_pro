import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  name1: string = '';
  role1: string = '';
  sortBy: string = '';
  limit: number = 5;
  page: number = 1;
  totalpages!: number;
  url = `/products?limit=${this.limit}&page=${this.page}`;
  products: any;
  constructor(private http: ApiServiceService, private rout: Router) {}
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
  temp(data: string) {
    this.rout.navigate(['/products/one-product'], { state: { example: data } });
  }

  sortByData(data: any) {
    console.log(data);
    this.sortBy = data;
    this.url = `/products?limit=${this.limit}&page=${this.page}&sortBy=${this.sortBy}`;
    this.getUserData();
  }
  serchValue(data: any) {
    if (data !== '') {
      console.log(data);
      this.name1 = data;
      this.url = `/products?limit=${this.limit}&page=${this.page}&name=${this.name1}`;
      this.getUserData();
    } else {
      this.url = `/products?limit=${this.limit}&page=${this.page}`;
      this.getUserData();
    }
  }
  previousPage() {
    this.page--;
    this.url = `/products?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  nextPage() {
    this.page++;
    this.url = `/products?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  handleLimit(data: any) {
    this.limit = data;
    this.url = `/products?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  
}


