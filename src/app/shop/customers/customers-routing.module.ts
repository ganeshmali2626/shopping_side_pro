import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    component: ProfileComponent,
    path: 'profile',
  },
  {
    component: CreateOrderComponent,
    path: 'creat-order',
  },
  {
    component: MakePaymentComponent,
    path: 'make-payment',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
