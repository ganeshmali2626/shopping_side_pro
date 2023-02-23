import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit,OnDestroy{
  Products:any;
  PaymentId:any;
  getPaymentData = new FormGroup({
    nameOnCard:new FormControl('', Validators.required),
    cardNumber:new FormControl('', Validators.required),
    expiry:new FormControl('', Validators.required),
    cvv:new FormControl('', Validators.required),

  });

  constructor(private http: ApiServiceService,
    private localstorage:LocalStorageServiceService,
    private toastr: ToastrService,
    private router: Router,
    private store:Store<{state:any,state1:any}>){ }
  ngOnInit(): void {
    this.store.select('state1').subscribe((data:any)=>{
      if(data.total!==0){
      this.Products=data;
      }else{
        console.log("hello");
        this.getCarts();

      }
    });
    console.log(this.Products);
    this.PaymentId=this.localstorage.getpaymentId();
    console.log(this.PaymentId);


  }
  getCarts(){
    this.store.select('state').subscribe((data:any)=>{
      this.Products=data;
    })
  }

  getCartData(data:any){
    console.log(data.value);
    this.http
      .putData(`/shop/orders/confirm/${this.PaymentId}`,data.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('Order Placed .', 'Successfully!');
          this.getPaymentData.reset({});
          this.router.navigate(['/shop/products'])
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
        },
      });

  }
  ngOnDestroy(): void {

    this.localstorage.removepaymentId()
  }

}
