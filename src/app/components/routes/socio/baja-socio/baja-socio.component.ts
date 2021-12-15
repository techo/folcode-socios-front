import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SociosService } from 'src/app/components/services/socios/socio.service';
import { SolicitudesService } from 'src/app/components/services/solicitudes/solicitudes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baja-socio',
  templateUrl: './baja-socio.component.html',
  styleUrls: ['./baja-socio.component.scss']
})
export class BajaSocioComponent implements OnInit {

  solicitudBaja!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  params:any;
  identity: any;
  email:any;
  usersList:any;
  user:any;
  loading = false;

  constructor(
    private _solicitud : SolicitudesService,
    private formBuilder: FormBuilder,
    private socio: SociosService,
    private snackBar: MatSnackBar,
    private routes: Router
  ) {
    this.solicitudBaja = this.formBuilder.group({
    razon: ['', Validators.required]
  });
    this.identity= JSON.parse(<string>localStorage.getItem('user'));
    this.email= this.identity.email;
  }

  ngOnInit(): void {
    this.verSocio();
    this.loadingSpinner();
  }

  get personal() { return this.solicitudBaja.controls; }

  //Guardar dato del usuario para enviar en la baja
  verSocio(){
    this.socio.ver_socios().subscribe(response=>{
      this.usersList = response;
      this.user = this.usersList.find((o: any) => o.mail == this.email);
      this.solicitudBaja.reset(this.user)
    },error=>{
    })
  }

  //Botones de siguiente o atrás del formulario
  next(){
    if(this.step==1){
          this.personal_step = true;
          if (this.solicitudBaja.invalid) { return  }
          this.step++
    }
  }

  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
  }

  //Enviar el formulario de baja
  enviarBaja(){
    this.params = {
      tipo: "Solicitud de Cese de Donación",
      datoACambiar: 'Razón de la baja: ' + this.solicitudBaja.value.razon,
      apellido: this.user.apellido,
      nombre: this.user.nombre,
      email: this.user.mail,
      uid: this.user.uid,
      dni: this.user.dni,
    }
    this.esperar();
    this._solicitud.solicitudCambio(this.params).subscribe(response =>{
      this.exitoso();
      this.routes.navigate(['/home-socios']);
    },error=>{
      this.error()
    })
  }

      /* SnackBar de avisos */
      error(){
        this.snackBar.open('Hubo un problema, intentelo más tarde','',{
          duration:3000,
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

    loadingSpinner(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
