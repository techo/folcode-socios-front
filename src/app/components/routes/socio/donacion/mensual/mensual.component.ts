import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/components/services/socios/socio.service';

@Component({
  selector: 'app-mensual',
  templateUrl: './mensual.component.html',
  styleUrls: ['./mensual.component.scss']
})
export class MensualComponent implements OnInit {

  identity: any;
  email: any;
  monto: any;
  usersList: any;
  user: any;
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
      this.monto = this.user.monto;
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
