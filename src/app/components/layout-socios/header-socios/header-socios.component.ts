import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SociosService } from '../../services/socios/socio.service';

@Component({
  selector: 'app-header-socios',
  templateUrl: './header-socios.component.html',
  styleUrls: ['./header-socios.component.scss']
})
export class HeaderSociosComponent implements OnInit {

  identity: any;
  email: any;
  userList: any;
  user: any;


  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private _auth: AuthService,
    private _socio: SociosService,
    
  ) { 
    this.identity= JSON.parse(<string>localStorage.getItem('user'));
    this.email= this.identity.email;
  }

  ngOnInit(): void {
    this.getUser();
  }

  //Cerrar Sesión
  logout(){
    this._auth.logout();
    localStorage.removeItem('token')
  }

  //Obtener datos del usuario
  getUser(){
    this._socio.ver_socios().subscribe(
      (response)=>{
        this.userList = response;
        this.user = this.userList.find((o: any) => o.mail == this.email);
    }, error =>{
    })
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
