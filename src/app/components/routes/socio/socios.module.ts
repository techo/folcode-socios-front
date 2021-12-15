import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutSociosModule } from '../../layout-socios/layout-socios.module';

import { HomeSociosComponent } from './home-socios/home-socios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BajaSocioComponent } from './baja-socio/baja-socio.component';
import { RecoverPassSocioComponent } from './recover-pass-socio/recover-pass-socio.component';
import { EditarPerfilComponent } from './perfil/editar-perfil/editar-perfil.component';
import { DonacionComponent } from './donacion/donacion.component';
import { UnicaComponent } from './donacion/unica/unica.component';
import { MensualComponent } from './donacion/mensual/mensual.component';
import { DatosComponent } from './donacion/datos/datos.component';
import { TransferenciaComponent } from './donacion/transferencia/transferencia.component';
import { CambiarTarjetaComponent } from './donacion/datos/cambiar-tarjeta/cambiar-tarjeta.component';
import { EditarMensualComponent } from './donacion/mensual/editar-mensual/editar-mensual.component';


const routes: Routes = [
  { path: '', redirectTo: 'home-socios'},
  { path: 'home-socios', component: HomeSociosComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'editar-perfil', component: EditarPerfilComponent},
  { path: 'cese-de-donacion', component: BajaSocioComponent},
  { path: 'recuperar-contraseña-socio', component: RecoverPassSocioComponent},
  { path: 'donacion', component: DonacionComponent},
  { path: 'donacion-unica', component: UnicaComponent},
  { path: 'donacion-mensual', component: MensualComponent},
  { path: 'donacion-mensual-editar', component: EditarMensualComponent},
  { path: 'datos-de-pago', component: DatosComponent},
  { path: 'cambiar-tarjeta', component: CambiarTarjetaComponent},
  { path: 'transferencia-bancaria', component: TransferenciaComponent},
];

@NgModule({
  declarations: [
    HomeSociosComponent,
    PerfilComponent,
    BajaSocioComponent,
    RecoverPassSocioComponent,
    EditarPerfilComponent,
    DonacionComponent,
    UnicaComponent,
    MensualComponent,
    DatosComponent,
    TransferenciaComponent,
    CambiarTarjetaComponent,
    EditarMensualComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule,
    LayoutSociosModule
  ]
})
export class SociosModule { }
