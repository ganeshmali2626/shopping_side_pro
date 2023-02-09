import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;
  constructor(private http: ApiServiceService, private rout: Router) {}
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.http.getData('/products').subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  temp(data: string) {
    this.rout.navigate(['/products/one-product'],{ state: { example: data } });
  }
}
