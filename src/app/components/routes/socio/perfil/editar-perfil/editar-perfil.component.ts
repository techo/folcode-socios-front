import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SociosService } from 'src/app/components/services/socios/socio.service';
import { SolicitudesService } from 'src/app/components/services/solicitudes/solicitudes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  id: any;
  user!: any;
  datosSocios!: FormGroup;
  usersList: any;
  identity:any;
  email:any;
  provincias = ['Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán'];

  params: any;
  flagNombre: boolean = true;
  flagApellido: boolean= true;
  flagDni: boolean = true;
  flagTelefono: boolean=true;
  flagProvincia: boolean=true;
  Opcion: string= "Eliga Campo a Cambiar";

  constructor(
    private socio: SociosService,
    private formBuilder: FormBuilder,
    private solicitud: SolicitudesService,
    private snackBar: MatSnackBar,
    private routes: Router,
  ) {
    this.datosSocios=  this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.email])],
      dni: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      provincia: ['', Validators.required],
      telef: ['', Validators.compose([Validators.required,Validators.minLength(9), Validators.maxLength(13)])],
      uid: ['', Validators.required],
    })
    this.identity= JSON.parse(<string>localStorage.getItem('user'));
    this.email= this.identity.email;
  }

  ngOnInit(): void {
    this.verSocio();
  }

  //Ver socio
  verSocio(){
    this.socio.ver_socios().subscribe(response=>{
      this.usersList = response;
      this.user = this.usersList.find((o: any) => o.mail == this.email);
      this.datosSocios.reset(this.user)
    },error=>{
    })
  }

  //Enviar las solicitudes
  editar_perfil(){
    this.params = {
      nombre: this.datosSocios.value.nombre,
      apellido: this.datosSocios.value.apellido,
      email: this.email,
      dni: this.datosSocios.value.dni,
      provincia: this.datosSocios.value.provincia,
      tipo: 'Solicitud de cambio datos personales',
      uid: this.datosSocios.value.uid,
      telef : this.datosSocios.value.telef
    }
    this.detectarDatoACambiar();
    this.esperar();
    this.solicitud.solicitudCambio(this.params).subscribe(response=>{
      let userEdit = response;
      this.exitoso();
      this.routes.navigate(['/home-socios']);
    },error=>{
      this.error();
    })
  }

  //Seleccion de campos a cambiar
  cambiar(){
    if(this.Opcion == 'nombre'){
      this.resetFlag();
      this.flagNombre = false;
    }else if(this.Opcion == 'apellido'){
      this.resetFlag();
      this.flagApellido = false;
    }
    else if(this.Opcion == 'dni'){
      this.resetFlag();
      this.flagDni = false;
    }
    else if(this.Opcion == 'provincia'){
      this.resetFlag();
      this.flagProvincia = false;
    }
    else if(this.Opcion == 'telefono'){
      this.resetFlag();
      this.flagTelefono = false;
    }
  }

  //Detecta el dato a cambiar
  detectarDatoACambiar(){
    if(this.flagNombre == false){
    this.params.datoACambiar= 'Nombre: ' + this.datosSocios.value.nombre;
    }else if (this.flagApellido==false){
    this.params.datoACambiar= 'Apellido: ' + this.datosSocios.value.apellido
    }else if (this.flagDni==false){
      this.params.datoACambiar= 'DNI: ' + this.datosSocios.value.dni
    }else if(this.flagTelefono==false){
      this.params.datoACambiar= 'Teléfono: ' + this.datosSocios.value.telef
    }else if(this.flagProvincia==false){
      this.params.datoACambiar= 'Provincia: ' + this.datosSocios.value.provincia
    }
  }

  resetFlag(){
    this.flagNombre = true;
    this.flagApellido = true;
    this.flagDni = true;
    this.flagTelefono = true;
    this.flagProvincia = true;
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
        duration:2000,
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
  

}
