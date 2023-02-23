import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTotal, decrementQuantity, deleteProduct, incrementQuantity } from 'src/app/cart-state-management/cart.action';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts:any;
constructor(private http: ApiServiceService,private store:Store<{state:any}>){}
  ngOnInit(): void {
    this.getCarts();
   
    }
    getCarts(){
      this.store.select('state').subscribe((data:any)=>{
        console.log(data);
        this.cartProducts=data;
        console.log(this.cartProducts);

      })
    }

minusproduct(data:any){
  console.log(data);
  this.store.dispatch(decrementQuantity({dataInfo:data}));
  this.store.dispatch(addTotal());
}
plusproduct(data:any){
  console.log(data);

  this.store.dispatch(incrementQuantity({dataInfo:data}));
  this.store.dispatch(addTotal());
}
deletedata(data:any){
  this.store.dispatch(deleteProduct({dataInfo:data}));
  this.store.dispatch(addTotal());
}

}
