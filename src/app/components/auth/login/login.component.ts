import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide= true;
  user: any;
  form: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {
this.form =this.fb.group({
'email': ['', Validators.compose([Validators.required, Validators.email])],
'password': ['', [Validators.required]]
})
}

  ngOnInit(): void {
  }

  login(){
    this.esperar(); 
    if(this.form.valid){
      this.authService.login(this.form.value.email, this.form.value.password).then(response=>{
        this.user = response;
            localStorage.setItem('user',JSON.stringify(this.user.user));
            localStorage.setItem('token',this.user.user.Aa)
            this.authService.getUsers().subscribe(response=>{
              let users = response;
              let claim = users.find((o: any) => o.mail == this.form.value.email).claims;
              if(claim.admin != undefined && claim.admin == true){
                localStorage.setItem('tipoDeUsuario', 'admin')
                this.router.navigate(['/home-adm']);
                this.bienvenida();
              }
              else{
                localStorage.setItem('tipoDeUsuario', 'socio')
                this.router.navigate(['/home-socios']);
                this.bienvenida();
              }
            })
      }).catch(() =>{ 
        console.log('error')
        this.errorUser();
        this.form.reset();
      })
    } else {
      this.error()
    }
    
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese un email registrado';
    }
    return this.email.hasError('email') ? 'No es un email válido' : '';
  }
  
  errorUser(){
    this._snackBar.open('Usuario o contraseña no válido','',{
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: "error",
    })
  }
  
  error(){
    this._snackBar.open('Completa todos los campos','',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass: "alerta"
    })
  }

  esperar(){
    this._snackBar.open('Espere un momento por favor','',{
      duration:8000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass: "alerta"
    })
  }

  bienvenida(){
    this._snackBar.open('¡Bienvenido/a!','',{
      duration:1000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass: "exito"
    })
  }
}
