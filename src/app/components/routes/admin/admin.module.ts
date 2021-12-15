import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from '../../shared/shared.module';

import { HomeAdmComponent } from './home-adm/home-adm.component';
import { AltaComponent } from './alta/alta.component';
import { SociosComponent } from './socios/socios.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { EditarComponent } from './editar/editar.component';
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';
import { RecoverPassAdmComponent } from './recover-pass-adm/recover-pass-adm.component';
import { LayoutModule } from '@angular/cdk/layout';


const routes: Routes = [
  { path: '', redirectTo: 'home-adm'},
  { path: 'home-adm', component: HomeAdmComponent},
  { path: 'alta', component: AltaComponent},
  { path: 'socios', component: SociosComponent},
  { path: 'solicitudes', component: SolicitudesComponent},
  { path: 'editar/:dni', component: EditarComponent},
  { path: 'editar-solicitud/:id/:di', component: EditarSolicitudComponent},
  { path: 'recuperar-contraseña-adm', component: RecoverPassAdmComponent}
];

@NgModule({
  declarations: [
    HomeAdmComponent,
    SociosComponent,
    AltaComponent,
    SolicitudesComponent,
    EditarComponent,
    EditarSolicitudComponent,
    RecoverPassAdmComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    LayoutModule,
    FormsModule,
  ],
  exports:[
    RouterModule
  ]
})
export class AdminModule { }
