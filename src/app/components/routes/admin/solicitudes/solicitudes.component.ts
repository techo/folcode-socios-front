import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SolicitudesService } from 'src/app/components/services/solicitudes/solicitudes.service';
import { DeleteSolicComponent } from 'src/app/components/shared/dialog/delete-solic/delete-solic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  /**/
  json_solicitud: any []= [];
  displayedColumns: string[] = ['data', 'email', 'tipo', 'accion'];
  dataSource!: MatTableDataSource<any>;
  loading = false;

  constructor( 
    private solicitudes: SolicitudesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private routes: Router,
    ) {

      this.ver_Solicitudes();
    }

  ngOnInit(): void {
    this.loadingSpinner();
    this.ver_Solicitudes();
  }

  /* Obtener las solicitudes para visualizarlas */
  ver_Solicitudes(){
    this.solicitudes.getSolicitudes().subscribe((response)=>{
      this.json_solicitud = response;
      this.dataSource = new MatTableDataSource(this.json_solicitud)
    })
  }

  /*Borrar las solicitudes */
  borrar_solicitud(id: any){ 
    this.solicitudes.deleteSolicitud(id).subscribe((resp)=>{
      this.eliminado();
      this.ver_Solicitudes();
    },error=>{
      this.eliminado();
      this.ver_Solicitudes();
    })
  }

  /*Hacer ruta para editar socio a través de la solicitud */
  editar( id:any, di: any){
    this.routes.navigate(['/editar-solicitud/'+ id +'/'+ di]);
  }

    /*Dialogo de Solicitar eliminar */
    openDialog(){
      const dialogRef = this.dialog.open(DeleteSolicComponent);

      dialogRef.afterClosed().subscribe(()=>{
        console.log('eliminado');
      })
    }

  /*Filtro*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*SnackBar */
  eliminado(){
    this.snackBar.open('La solicitud se eliminó correctamente','',{
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'exito'
    })
  }

  //Spinner para cargar datos
  loadingSpinner(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}


