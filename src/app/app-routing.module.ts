import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard, AuthGuardlogin } from './guard/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'seller', pathMatch: 'full' },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((mod) => mod.SellerModule),
  },
  // {
  //   canActivate: [AuthGuardGuard],
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./modules/seller/home/home.module').then((mod) => mod.HomeModule),
  // },
  // {
  //   canActivate: [AuthGuardGuard],
  //   path: 'products',
  //   loadChildren: () =>
  //     import('./products/products.module').then((mod) => mod.ProductsModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
