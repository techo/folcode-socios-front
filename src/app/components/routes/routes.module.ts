import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    LayoutModule,
    RouterModule
  ],
  exports:[
    HomeComponent,
    RouterModule,
  ]
})
export class RoutesModule { }
