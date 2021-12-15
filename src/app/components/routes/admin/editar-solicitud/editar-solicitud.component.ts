import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SociosService } from 'src/app/components/services/socios/socio.service';
import { SolicitudesService } from 'src/app/components/services/solicitudes/solicitudes.service';
import { BackSolicitudComponent } from 'src/app/components/shared/dialog/back-solicitud/back-solicitud.component';
import { DeleteSolicComponent } from 'src/app/components/shared/dialog/delete-solic/delete-solic.component';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.scss']
})
export class EditarSolicitudComponent implements OnInit {

  socio: any;
  datosSocios!: FormGroup; //buscar el id del usuario para hacer la funcion de cambiar datos
  datos:any;
  id: any;
  idSocio: any;
  idSolicitud:any;
  uids:any;
  uid:any
  user: any;
  usersList: any;
  cambios:any;
  json_solicitud!: any;
  email: any;
  password = '';
  tipoTarjeta = ['Visa Crédito','Visa Débito','Mastercard','American Express','Cabal','Naranja','Nevada','Shopping','Nativa','Cencosud']; //no hay problema si declaro con espacio blancos pq son string.
  provincias = ['Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán'];
  loading = false;
  

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private formBuilder : FormBuilder,
    private snackBar: MatSnackBar,
    private socios : SociosService,
    private solicitudes: SolicitudesService, 
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
      this.datosSocios=  this.formBuilder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        mail: ['', Validators.compose([Validators.required, Validators.email])],
        dni: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
        provincia: ['', Validators.required],
        telef: ['', Validators.compose([Validators.required,Validators.minLength(9), Validators.maxLength(13)])],
        contrasena: [''],
        tarjeta:['',Validators.required],
        monto:['',Validators.required],
        numTarjeta:['',Validators.compose([Validators.required,Validators.maxLength(4)])],
        uid: ['']
      })
      this.email = this._route.snapshot.paramMap.get('di')
      this.id = this._route.snapshot.paramMap.get('id');
      this.ver_Solicitudes();
    }

  ngOnInit(): void {
    this.loadingSpinner();
    this.verUser();
  }
  

  //Guardar uid para guardar cambios
    getUid(){
      let fireUser: any;
      this.socios.verUserFirebase().subscribe(response=>{
        fireUser = response;
        this.uids = fireUser.find((o:any)=> o.mail === this.email)
      })
    }

  //Ver usuario de la Base de Dato para visualizarla
    verUser(){
      this.socios.ver_socios().subscribe(response=>{
        this.usersList = response;
        this.user = this.usersList.find((o: any) => o.mail == this.email);
        this.datosSocios.reset(this.user)
        this.uid = this.user.uid;
        this.idSocio = this.user.id;
      })
    }

  /* Obtener las solicitudes para visualizarlas */
    ver_Solicitudes(){
      this.solicitudes.getSolicitudes().subscribe((response)=>{
        this.json_solicitud = response;
        this.cambios = this.json_solicitud.find((x: { id: number; }) => x.id == this.id);
        this.idSolicitud = this.cambios.id;
        this.cd.detectChanges()
      })
    }

  /*Guardar los cambios y actualizar socio con nueva información y borrar la solicitud*/
    cambiar_Datos(){
      for (let c in this.datosSocios.controls){
        this.datosSocios.controls[c].markAsTouched();
      }
      if(this.datosSocios.valid){
        this.datos = Object.assign(this.datosSocios.value);
        this.esperar();
        this.socios.modificar_socio(this.datos,this.idSocio).subscribe(response =>{
          this.borrar_solicitud();
          this.exitoso();
          this.router.navigate(['/solicitudes']);
        },error=>{
          this.borrar_solicitud();
          this.exitoso();
          this.router.navigate(['/solicitudes']);
        })
      } else{
        this.errorCompletar();
      }
    }

  /*Eliminar Socio */
    eliminar(){
      this.esperar();
      this.socios.eliminarSocio(this.idSocio).subscribe(response =>{
        this.borrar_solicitud();
        this.socioEliminado();
        this.router.navigate(['/socios'])
      }, error=>{
        this.borrar_solicitud();
        this.socioEliminado();
        this.router.navigate(['/solicitudes'])
      })
    }

  /*Borrar solicitud una vez guarde los cambios*/
    borrar_solicitud(){ 
      this.solicitudes.deleteSolicitud(this.idSolicitud).subscribe((resp)=>{
      },error=>{
      })
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

    errorEliminar(){
      this.snackBar.open('Error, no se pudo dar la baja a este socio, intentelo más tarde.','',{
        duration:5000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "error"
      })
    }

    exitoso(){
      this.snackBar.open('¡Se guardaron los datos con éxito!','',{
        duration:4000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass: "exito"
      })
    }

    socioEliminado(){
      this.snackBar.open('¡Se dió de baja al socio con éxito!','',{
        duration:4000,
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
      this.dialog.open(BackSolicitudComponent);
    }

    /*Dialogo para asegurar si desea dar de baja al socio/a */
    dialogDelete(){
      let dialog = this.dialog.open(DeleteSolicComponent);
      dialog.afterClosed().subscribe(result => {
        if(result == true){
          this.eliminar();
          this.borrar_solicitud();
        }
      })
    }
    
  //Cargar datos con spinner
    loadingSpinner(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }

}
