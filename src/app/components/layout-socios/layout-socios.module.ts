import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { LayoutSociosComponent } from './layout-socios.component';
import { HeaderSociosComponent } from './header-socios/header-socios.component';
import { FooterSociosComponent } from './footer-socios/footer-socios.component';
import { SidenavSociosComponent } from './sidenav-socios/sidenav-socios.component';



@NgModule({
  declarations: [
    LayoutSociosComponent,
    HeaderSociosComponent,
    FooterSociosComponent,
    SidenavSociosComponent
  ],
  exports: [
    HeaderSociosComponent,
    FooterSociosComponent,
    SidenavSociosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class LayoutSociosModule { }
