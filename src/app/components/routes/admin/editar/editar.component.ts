import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/components/services/auth/auth.service';
import { SociosService } from 'src/app/components/services/socios/socio.service';
import { BackSocioComponent } from 'src/app/components/shared/dialog/back-socio/back-socio.component';
import { DeleteSolicComponent } from 'src/app/components/shared/dialog/delete-solic/delete-solic.component';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  socio: any;
  datosSocios!: FormGroup;
  dni: any;
  datos:any;
  email = '';
  password = '';
  tipoTarjeta = ['Visa Crédito','Visa Débito','Mastercard','American Express','Cabal','Naranja','Nevada','Shopping','Nativa','Cencosud']; //no hay problema si declaro con espacio blancos pq son string.
  provincias = ['Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán'];
  loading = false;
  
  constructor(
    private _authService: AuthService,
    public auth: AngularFireAuth,
    private router: Router,
    private formBuilder : FormBuilder,
    private snackBar: MatSnackBar,
    private socios : SociosService, 
    private dialog: MatDialog,
    private _route: ActivatedRoute,
  ) {
      this.datosSocios=  this.formBuilder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        mail: ['', Validators.compose([Validators.required, Validators.email])],
        dni: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
        provincia: ['', Validators.required],
        telef: ['', Validators.compose([Validators.required,Validators.minLength(9), Validators.maxLength(13)])],
        tarjeta:['',Validators.required],
        monto:['',Validators.required],
        numTarjeta:['',Validators.compose([Validators.required,Validators.maxLength(4)])],
        uid: ['']
      })
      this.dni = this._route.snapshot.paramMap.get('dni');
    }

  ngOnInit(): void {
    this.loadingSpinner();
    this.edit(this.dni);
  }


  /*Traer todos los datos de ese socio por el DNI*/
    edit(dni:any){
      this.socios.ver_un_socio(dni).subscribe(response =>{
        this.socio = response;
        this.datosSocios.reset(this.socio);
      },error=>{}
      );
    }

  /*Guardar los cambios y actualizar socio con nueva información*/
    cambiar_Datos(){
      for (let c in this.datosSocios.controls){
        this.datosSocios.controls[c].markAsTouched();
      }
      if(this.datosSocios.valid){
        this.datos = Object.assign(this.datosSocios.value);
        this.datos.id = this.socio.id;
        this.esperar();
        this.socios.modificar_socio(this.datos,this.datos.id).subscribe(response =>{
          this.exitoso();
          this.router.navigate(['/socios']);
        },error=>{
          this.exitoso();
          this.router.navigate(['/socios']);
        })
      } else{
        this.errorCompletar();
      }
    }

  /*Eliminar Socio */ // reemplazar por ID y agregar toast
    eliminar(){
      this.socios.eliminarSocio(this.socio.id).subscribe(response =>{
        this.esperarEliminar();
        this.router.navigate(['/socios'])
      }, error=>{
        this.deleteExitoso();
        this.router.navigate(['/socios']);
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

    error_serv(){
      this.snackBar.open('Error, no se pudo cambiar los datos del al socio/a: Email o DNI ya existentes.','',{
        duration:5000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "error"
      })
    }

    exitoso(){
      this.snackBar.open('¡Se guardaron los cambios con éxito!','',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "exito"
      })
    }

    deleteExitoso(){
      this.snackBar.open('¡Se dió de baja el socio con éxito!','',{
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

    esperarEliminar(){
      this.snackBar.open('Espere un momento mientras damos de baja al usuario','',{
        duration:7000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "esperar"
      })
    }

    errorCompletar(){
      this.snackBar.open('Completá todos los campos','',{
        duration:4000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "alerta"
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

  /*Dialogo para volver atrás*/
    openDialog(){
      this.dialog.open(BackSocioComponent);
    }

    dialogDelete(){
      let dialog = this.dialog.open(DeleteSolicComponent);
      dialog.afterClosed().subscribe(result => {
        if(result == true){
          this.eliminar();
        } else{}
      })
    }

  /*Cargar datos esperando con spinner*/
    loadingSpinner(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }

}
