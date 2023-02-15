import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ShopModule } from '../shop.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ShopModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
