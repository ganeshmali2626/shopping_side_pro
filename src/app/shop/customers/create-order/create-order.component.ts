import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import { ToastrService } from 'ngx-toastr';
import { clearCart, deleteProduct, deletOne } from 'src/app/cart-state-management/cart.action';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit,OnDestroy{
  userAddress: any;
  Products: any;
  selectedIndex: any;
  x=0;
  a = 0;
  i!: number;

  allProductsDetails: {
    items: [];
    deliveryFee: number;
    total: number;
    address: {};
  } = {
    items: [],
    deliveryFee: 0,
    total: 0,
    address: {},
  };

  getAddress = new FormGroup({
    street: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    pin: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  });
  data1: any;

  constructor(
    private http: ApiServiceService,
    private router: Router,
    private toastr: ToastrService,
    private localstorage:LocalStorageServiceService,
    private store: Store<{ state: any; state1: any }>
  ) {}
  ngOnInit(): void {
    this.store.select('state1').subscribe((data: any) => {
      console.log(data);
      if (data.total !== 0) {
        this.Products = data;
        console.log(this.Products);
      } else {
        console.log('hello');
        this.getCarts();
      }
    });
    this.getAddress1();
    if (this.Products?.items?.length == 0) {
      this.router.navigate(['/shop/products/']);
    }
  }

  getCarts() {
    this.store.select('state').subscribe((data: any) => {
      console.log(data);
      this.Products = data;
      console.log(this.Products);
    });
  }
  changeSelection(event: any, index: any) {
    this.selectedIndex = event.target.checked ? index : undefined;
    this.i = index;
  }
  changeAddress() {
    this.a = this.i;
    console.log(this.i);
    console.log(this.a);
  }
  getAddress1() {
    this.http.getData('/customers/address').subscribe({
      next: (res) => {
        console.log(res);
        this.userAddress = res;
        console.log(this.userAddress);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  address() {
    this.http.postData('/customers/address', this.getAddress.value).subscribe({
      next: (res) => {
        this.toastr.success('Added .', 'Successfully!');
        this.getAddress1();
        this.getAddress.reset({});
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Somthing Wrong!');
      },
    });
  }
  sendUserInfo() {




    // delete this.userAddress[this.a]._id;
    this.allProductsDetails.items=this.Products?.items;
    this.allProductsDetails.deliveryFee=this.Products?.deliveryFee;
    this.allProductsDetails.total=this.Products?.total;
    this.allProductsDetails.address=this.userAddress[this.a];

    this.http.postData('/shop/orders',this.allProductsDetails ).subscribe({
      next: (res) => {
        this.toastr.success('Placed .', 'Successfully!');
        console.log(res);
        this.data1=res;
        this.store.dispatch(clearCart());
        this.localstorage.setpaymentId(this.data1.order._id);
        this.router.navigate(['/shop/customers/make-payment'])
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Somthing Wrong!');
        console.log(err);

      },
    });
  }
  ngOnDestroy(): void {
    this.store.dispatch(deletOne());
  }
}
