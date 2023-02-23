import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/guard/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    canActivate: [AuthGuardGuard],
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    canActivate: [AuthGuardGuard],
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((mod) => mod.ProductsModule),
  },
  {
    canActivate: [AuthGuardGuard],
    path: 'order-management',
    loadChildren: () =>
      import('./order-management/order-management.module').then((mod) => mod.OrderManagementModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
