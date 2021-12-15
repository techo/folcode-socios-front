import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../layout/layout.component';
import { HomeAdmComponent } from './home-adm/home-adm.component';


import { AppGuard } from '../../shared/Guards/auth.guard';

const routes: Routes = [
    {
        path:'',
        canActivate: [AppGuard],
        component: LayoutComponent,
        children:[
            {path: 'home-adm', component: HomeAdmComponent},
            {path: '', }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
