import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPassworComponent } from './forgot-passwor/forgot-passwor.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: RegistrationComponent,
    path: 'register',
  },
  {
    component: ForgotPassworComponent ,
    path: 'forget-password',
  },
  {
    component: ResetPasswordComponent ,
    path: 'reset-password',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
