import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/auth/login/login.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { LayoutSociosComponent } from './components/layout-socios/layout-socios.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/routes/home/home.component';

import { AdminGuard } from './components/shared/Guards/admin.guard';
import { AppGuard } from './components/shared/Guards/auth.guard';

const routes: Routes = [
  //Rutas de inicio, sin ingresar al sistema

  {path: '', component: HomeComponent},
  {path: 'recuperar-contraseña', component: RecoverPasswordComponent},
  {path: 'login', component: LoginComponent},

  //Rutas del administrador
  { 
  path: '',
  canActivate: [AdminGuard],
  component: LayoutComponent,
  children: [
    { path: '', redirectTo:'home-adm', pathMatch: 'full'},
    { path: '', loadChildren: () => import('./components/routes/admin/admin.module').then(m=>m.AdminModule) },
  ],
},
  
  //Rutas del socio
  { 
    path: '',
    canActivate: [AppGuard],
    component: LayoutSociosComponent,
    children: [
      { path: '', redirectTo:'home-socios', pathMatch: 'full'},
      { path: '', loadChildren: () => import('./components/routes/socio/socios.module').then(m=>m.SociosModule) },
    ],
  },

  //Ruta no existente
  {path: '**',pathMatch: 'full', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
