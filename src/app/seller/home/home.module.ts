import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { HomeRoutingModule } from './home-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyprofileComponent, NavbarComponent, UsersComponent],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [NavbarComponent],
})
export class HomeModule {}
