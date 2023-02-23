import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CustomerAuthGuardGuard,
  CustomerAuthGuardlogin,
} from '../guard/auth-guard.guard';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    component: ProductsComponent,
    path: 'products',
  },
  {
    component: CartComponent,
    path: 'carts',
  },
  {
    canActivate: [CustomerAuthGuardlogin],
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    canActivate: [CustomerAuthGuardGuard],
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((mod) => mod.CustomersModule),
  },
  {
    canActivate: [CustomerAuthGuardGuard],
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((mod) => mod.OrdersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
