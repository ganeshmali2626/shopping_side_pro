import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPassworComponent } from './forgot-passwor/forgot-passwor.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuardGuard, AuthGuardlogin } from '../guard/auth-guard.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    canActivate: [AuthGuardlogin],
    component: LoginComponent,
    path: 'login',
  },
  {
    canActivate: [AuthGuardlogin],
    component: RegistrationComponent,
    path: 'register',
  },
  {
    canActivate: [AuthGuardlogin],
    component: ForgotPassworComponent,
    path: 'forget-password',
  },
  {
    canActivate: [AuthGuardlogin],
    component: ResetPasswordComponent,
    path: 'reset-password',
  },
  {
    canActivate: [AuthGuardGuard],
    component: VerifyEmailComponent,
    path: 'verify-email',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
