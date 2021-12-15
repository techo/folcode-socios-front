import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/components/services/socios/socio.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {

  usersList: any;
  user: any;
  email: any;
  numero: any;
  identity: any;
  tarjeta: any;
  loading = false;

  constructor(
    private socio: SociosService,
  ) {
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
      this.numero = this.user.numTarjeta;
      this.tarjeta = this.user.tarjeta;
    },error=>{
    })
  }

  loadingSpinner(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
