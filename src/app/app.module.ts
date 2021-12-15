import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './components/layout/layout.module';
import { SharedModule } from './components/shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { LayoutSociosModule } from './components/layout-socios/layout-socios.module';
import { RoutesModule } from './components/routes/routes.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppGuard } from './components/shared/Guards/auth.guard';
import { environment } from '../environments/environment';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminGuard } from './components/shared/Guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    LayoutModule,
    LayoutSociosModule,
    SharedModule,
    AuthModule,
    RoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule
    
  ],
  providers: [AppGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
