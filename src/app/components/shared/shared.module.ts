import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { BackHomeComponent } from './dialog/back-home/back-home.component';
import { DeleteSolicComponent } from './dialog/delete-solic/delete-solic.component';
import { BackSolicitudComponent } from './dialog/back-solicitud/back-solicitud.component';
import { BackSocioComponent } from './dialog/back-socio/back-socio.component';
import { BackDonacionMensualComponent } from './dialog/back-donacion-mensual/back-donacion-mensual.component';
import { BackDatosTarjetaComponent } from './dialog/back-datos-tarjeta/back-datos-tarjeta.component';




@NgModule({
  declarations: [
    BackHomeComponent,
    DeleteSolicComponent,
    BackSolicitudComponent,
    BackSocioComponent,
    BackDonacionMensualComponent,
    BackDatosTarjetaComponent
  ],
  exports: [
    BackHomeComponent,
    DeleteSolicComponent,
    BackSolicitudComponent,
    BackSocioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
