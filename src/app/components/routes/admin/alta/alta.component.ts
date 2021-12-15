import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SociosService } from 'src/app/components/services/socios/socio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BackHomeComponent } from 'src/app/components/shared/dialog/back-home/back-home.component';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  datosSocios!: FormGroup;

  datos:any;
  email = '';
  password = '';
  tipoTarjeta = ['Visa Crédito','Visa Débito','Mastercard','American Express','Cabal','Naranja','Nevada','Shopping','Nativa','Cencosud']; //no hay problema si declaro con espacio blancos pq son string.
  provincias = ['Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán'];

  constructor(
    private _authService: AuthService,
    public auth: AngularFireAuth,
    private router: Router,
    private formBuilder : FormBuilder,
    private snackBar: MatSnackBar,
    private socios : SociosService, //servicio
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.datosSocios=  this.formBuilder.group({
    
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.email])],
      dni: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      provincia: ['', Validators.required],
      telef: ['', Validators.compose([Validators.required,Validators.minLength(9), Validators.maxLength(13)])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      tarjeta:['',Validators.required],
      monto:['',Validators.required],
      numTarjeta:['',Validators.compose([Validators.required,Validators.maxLength(4)])]
    })
  }

  enviar(){
    this.datos = Object.assign(this.datosSocios.value);

    let params = {mail:this.datos.mail,password:this.datos.contrasena}; 
    this._authService.registerSocio(params).subscribe(
      response=>{
        console.log(this.datos);
        this.socios.crear_socio(this.datos).subscribe(
        response=>{
          console.log(response)
        },error=>{
          console.log(error)}
        )
      },error=>{
        console.log(error)}
    );
  }

  /* Método para enviar los datos */
  enviarUser(){

    for (let c in this.datosSocios.controls){
      this.datosSocios.controls[c].markAsTouched();
    }
    if(this.datosSocios.valid){
    this.datos = Object.assign(this.datosSocios.value);
    this.auth.createUserWithEmailAndPassword(this.datos.mail,this.datos.contrasena).then(
      (response)=>{
        this.esperar();
        this.socios.crear_socio(this.datos).subscribe(
          response=>{
            this.exitoso();
            this.router.navigate(['/home-adm']);
          }, error=>{
            this.showNotificacion('Error, no se pudo dar de alta al socio/a, intentá de nuevo más tarde','');
            console.log(error)
          }
        )
      },
    ).catch((error)=>{
      this.showNotificacion('¡DNI o Email ya existentes!','');
      console.log(error)
    })
    } else{
      this.error();
    }
    
  }


  /* SnackBar de avisos */
  error(){
    this.snackBar.open('Completá todos los campos','',{
      duration:4000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass: "alerta"
    })
  }

  error_serv(){
    this.snackBar.open('Error, no se pudo dar de alta al socio/a: Email o DNI ya existentes.','',{
      duration:5000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass: "error"
    })
  }

  exitoso(){
    this.snackBar.open('¡Se dió de alta con éxito!','',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass: "exito"
    })
  }

  esperar(){
    this.snackBar.open('Espere un momento mientras guardamos los datos','',{
      duration:7000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass: "esperar"
    })
  }

  showNotificacion(displayMessage:string,buttonText:string){
    this.snackBar.open(displayMessage,buttonText,{
      duration:5000,
      horizontalPosition:'right',
      verticalPosition:'top',
      panelClass: "alerta"
    });
  }
/*
  showChanges(){
    this.snackBar.openFromComponent(AltaComponent,{
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }
*/ 

  openDialog(){
    this.dialog.open(BackHomeComponent);
  }
}
