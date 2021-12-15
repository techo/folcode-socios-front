import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SociosService } from 'src/app/components/services/socios/socio.service';
import { SolicitudesService } from 'src/app/components/services/solicitudes/solicitudes.service';
import { BackDonacionMensualComponent } from 'src/app/components/shared/dialog/back-donacion-mensual/back-donacion-mensual.component';

@Component({
  selector: 'app-editar-mensual',
  templateUrl: './editar-mensual.component.html',
  styleUrls: ['./editar-mensual.component.scss']
})
export class EditarMensualComponent implements OnInit {

  identity: any;
  email: any;
  monto: any;
  usersList: any;
  user: any;
  loading = false;
  montoNuevo: any;
  params: any;
  montoSocio!: FormGroup;

  constructor(
    private socio: SociosService,
    private solicitud: SolicitudesService,
    private form: FormBuilder,
    private snackBar: MatSnackBar,
    private routes: Router,
    private dialog: MatDialog
  ) {
    this.montoSocio = this.form.group({
      datoACambiar: [this.montoNuevo, Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.email])],
      uid: ['', Validators.required],
      dni: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
    })
    this.identity= JSON.parse(<string>localStorage.getItem('user'));
    this.email= this.identity.email;
  }

  ngOnInit(): void {
    this.loadingSpinner();
    this.verSocio();
  }

  verSocio(){
    this.socio.ver_socios().subscribe(response=>{
      this.usersList = response;
      this.user = this.usersList.find((o: any) => o.mail == this.email);
      this.monto = this.user.monto;
    },error=>{
    })
  }

  sumarMonto(){
    this.monto = this.monto + 100;
    this.montoNuevo= this.monto;
    this.montoSocio.value.datoACambiar = this.montoNuevo
    return this.monto;
  }

  solicitarMonto(){
    this.esperar();
    this.params = {
      tipo: "Solicitud de cambio de monto de donación",
      datoACambiar: 'Monto de donación nuevo: ' + this.montoSocio.value.datoACambiar,
      apellido: this.user.apellido,
      nombre: this.user.nombre,
      email: this.user.mail,
      uid: this.user.uid,
      dni: this.user.dni,
    }
    this.solicitud.solicitudCambio(this.params).subscribe(response=>{
      this.exitoso();
      this.routes.navigate(['/donacion']);
    }, error=>{
      this.error();
    })
  }

  loadingSpinner(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

    /* SnackBar de avisos */
    error(){
      this.snackBar.open('Hubo un problema, intentelo más tarde','',{
        duration:4000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "alerta"
      })
    }
  
    exitoso(){
      this.snackBar.open('¡Se envió la solicitud correctamente!','',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "exito"
      })
    }
  
    esperar(){
      this.snackBar.open('Espere un momento mientras enviamos la solicitud','',{
        duration:7000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "esperar"
      })
    }

      /*Dialogo para volver atrás*/
      openDialog(){
        this.dialog.open(BackDonacionMensualComponent);
      }
}
