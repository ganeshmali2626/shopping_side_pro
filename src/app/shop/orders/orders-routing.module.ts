import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'orders-history', pathMatch: 'full' },
  {
    component: OrdersHistoryComponent,
    path: 'orders-history',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
