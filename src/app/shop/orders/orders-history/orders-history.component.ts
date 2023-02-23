import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  orders:any;
  limit: number = 10;
  page: number = 1;
  totalpages!: number;
  url='/shop/orders';
  pendingProduct:any;
  subtotal:any;
  constructor(private http: ApiServiceService,private toastr: ToastrService,private localstorage:LocalStorageServiceService, private rout: Router){}
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(){
    this.http.getData(this.url).subscribe({
      next: (res: any) => {
        this.orders=res;
        console.log(res);
        this.totalpages=res.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goToPayment(data:any){
    this.localstorage.setpaymentId(data);
    this.rout.navigate(['/shop/customers/make-payment'])
  }
  previousPage() {
    this.page--;
    this.url = `/shop/orders?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  nextPage() {
    this.page++;
    this.url = `/shop/orders?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  getdata(data:any){
    console.log(data);

    this.http.getData(`/shop/orders/${data}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.pendingProduct=res;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
  cancelOrder(data:string){
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
    this.http
    .patchData(`/shop/orders/cancel/${data}`,"")
    .subscribe({
      next: (res) => {
        Swal.fire('Cancel!', 'Your Order has been Canceled.', 'success');
        this.getUserData();
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Somthing Wrong!');
      },
    });
  }
});

}
}
