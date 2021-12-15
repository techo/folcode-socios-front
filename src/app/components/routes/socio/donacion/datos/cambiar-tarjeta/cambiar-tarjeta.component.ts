import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SociosService } from 'src/app/components/services/socios/socio.service';
import { SolicitudesService } from 'src/app/components/services/solicitudes/solicitudes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BackDatosTarjetaComponent } from 'src/app/components/shared/dialog/back-datos-tarjeta/back-datos-tarjeta.component';

@Component({
  selector: 'app-cambiar-tarjeta',
  templateUrl: './cambiar-tarjeta.component.html',
  styleUrls: ['./cambiar-tarjeta.component.scss']
})
export class CambiarTarjetaComponent implements OnInit {

  tipoTarjeta = ['Visa Crédito','Visa Débito','Mastercard','American Express','Cabal','Naranja','Nevada','Shopping','Nativa','Cencosud']; //no hay problema si declaro con espacio blancos pq son string.
  datosTarjeta!: FormGroup;
  flagCambiar: boolean = false;
  params: any;
  usersList: any;
  user: any;
  email: any;
  identity: any;

  constructor(
    private form: FormBuilder,
    private solicitud: SolicitudesService,
    private snackBar: MatSnackBar,
    private socio: SociosService,
    private routes: Router,
    private dialog: MatDialog
  ) { 
    this.datosTarjeta = this.form.group({
      tarjeta:['',Validators.required],
      numTarjeta:['',Validators.compose([Validators.required, Validators.minLength(4)])],
    })
    this.identity= JSON.parse(<string>localStorage.getItem('user'));
    this.email= this.identity.email;
  }

  ngOnInit(): void {
    this.verSocio()
  }

  verSocio(){
    this.socio.ver_socios().subscribe(response=>{
      this.usersList = response;
      this.user = this.usersList.find((o: any) => o.mail == this.email);
    },error=>{
    })
  }

  cambiar(){
    for (let c in this.datosTarjeta.controls){
      this.datosTarjeta.controls[c].markAsTouched();
    if (this.datosTarjeta.valid){
      this.flagCambiar = true;
      }
    }
  }
  
  enviarTarjeta(){
    this.esperar();
    this.params = {
      datoACambiar: 'Tarjeta: '+ this.datosTarjeta.value.tarjeta + ', ' + 'Numero de tarjeta: ' + this.datosTarjeta.value.numTarjeta, 
      tipo: 'Solicitud de cambio datos de tarjeta',
      apellido: this.user.apellido,
      nombre: this.user.nombre,
      email: this.user.mail,
      uid: this.user.uid,
      dni: this.user.dni,
    }
    this.solicitud.solicitudCambio(this.params).subscribe(response=>{
      this.exitoso();
      this.routes.navigate(['/donacion'])
    }, error=>{
      this.error();
    })
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
      this.snackBar.open('Espere un momento mientras enviamos los datos','',{
        duration:7000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "esperar"
      })
    }

    /*Dialogo para volver atrás*/
    openDialog(){
      this.dialog.open(BackDatosTarjetaComponent);
    }
}
