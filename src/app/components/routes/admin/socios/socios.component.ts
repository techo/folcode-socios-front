import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SociosService } from 'src/app/components/services/socios/socio.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


export interface Data {
  nombre: string,
  apellido: string,
  correo: string,
  dni: string,
  provincia: string
}
@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.scss']
})


export class SociosComponent implements OnInit {
  json: any;
  dataSource: MatTableDataSource<Data>;
  displayedColumns: string[] = ['nombre', 'apellido', 'provincia', 'correo','dni', 'accion'];
  filter:any;
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private routes: Router,
    private socios : SociosService, 
    ) {
    this.ver_socios();
  }

  ngOnInit(): void {
    this.loadingSpinner();

    this.socios.ver_socios().subscribe((response :any)=>{
      this.json = response; 
      this.dataSource = new MatTableDataSource<Data>(response);
      this.dataSource.paginator = this.paginator;
    });
    this.ver_socios();
  }

  /*Obtener listado de los socios */
  ver_socios(){
    this.socios.ver_socios().subscribe((response :any)=>{
      this.json=response; 
      this.dataSource = new MatTableDataSource<Data>(response);
      this.dataSource.paginator = this.paginator;
    },error =>{
    });
  }

  //Ruta para ver detalle de socio
  editar(id: any){
    this.routes.navigate(['/editar/',id]);
  }

  /*Filtro*/
  applyFilter(event: Event) {
    const filterVlue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVlue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadingSpinner(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}


