import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from '../products/products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OneProductComponent } from './one-product/one-product.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    CreateProductComponent,
    ProductListComponent,
    OneProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HomeModule
  ],
})
export class ProductsModule {}
