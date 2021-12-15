import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SociosService } from 'src/app/components/services/socios/socio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  id: any;
  user!: any;
  datosSocios!: FormGroup;
  usersList: any;
  identity:any;
  email:any;

  constructor(
    private _route: ActivatedRoute,
    private socio: SociosService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,

  ) {
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
    });

    this._route.queryParams.subscribe(params =>{
    this.id = params.id;
    });
    this.identity= JSON.parse(<string>localStorage.getItem('user'));
    this.email= this.identity.email;
  }

  ngOnInit(): void {
    this.verSocio();
  }

  //otra prueba de ver socio
  verSocio(){
    this.socio.ver_socios().subscribe(response=>{
      this.usersList = response;
      this.user = this.usersList.find((o: any) => o.mail == this.email);
      this.datosSocios.reset(this.user)
    },error=>{
    })
  }
}
