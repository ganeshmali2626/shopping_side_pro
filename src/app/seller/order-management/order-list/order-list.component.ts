import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: any;
  limit: number = 10;
  page: number = 1;
  totalpages!: number;
  url = '/orders';
  pendingProduct: any;
  constructor(private http: ApiServiceService, private rout: Router) {}
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.http.getData(this.url).subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders = res;
        this.totalpages = res.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getdata(data: any) {
    this.http.getData(`/orders/${data}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.pendingProduct = res[0];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  previousPage() {
    this.page--;
    this.url = `/orders?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  nextPage() {
    this.page++;
    this.url = `/orders?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  action(data: any,data1:any) {
    // console.log(data.target.innerText,data1);
    this.http.patchData(`/orders/${data.target.innerText}/${data1}`,"").subscribe({
      next: (res: any) => {
        console.log(res);
        this.getUserData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
