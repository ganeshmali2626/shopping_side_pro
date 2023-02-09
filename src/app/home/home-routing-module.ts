import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  { path: '', redirectTo: 'myprofile', pathMatch: 'full' },
  {

    component: MyprofileComponent,
    path: 'myprofile',
  },
  {

    component: UsersComponent,
    path: 'users',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
