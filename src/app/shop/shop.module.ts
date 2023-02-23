import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CartComponent } from './cart/cart.component';
import {NgDompurifyModule} from '@tinkoff/ng-dompurify';


@NgModule({
  declarations: [
    ProductsComponent,
    MainNavComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    NgDompurifyModule,
    ShopRoutingModule
  ],
  exports: [MainNavComponent],
})
export class ShopModule { }
