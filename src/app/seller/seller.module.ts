import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SellerRoutingModule } from './seller-routing.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    AuthModule,
    ProductsModule,
    SellerRoutingModule,
  ],
})
export class SellerModule {}
