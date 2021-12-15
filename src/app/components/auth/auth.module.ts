import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    RecoverPasswordComponent,
    LoginComponent
  ],
  exports: [
    RecoverPasswordComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LayoutModule
  ]
})
export class AuthModule { }
