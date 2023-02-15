import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CustomerAuthGuardGuard,
  CustomerAuthGuardlogin,
} from '../guard/auth-guard.guard';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    component: ProductsComponent,
    path: 'products',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
