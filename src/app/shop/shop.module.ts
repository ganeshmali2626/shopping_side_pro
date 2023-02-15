import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { MainNavComponent } from './main-nav/main-nav.component';


@NgModule({
  declarations: [
    ProductsComponent,
    MainNavComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ],
  exports: [MainNavComponent],
})
export class ShopModule { }
