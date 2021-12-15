import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/services/auth/auth.service';

@Component({
  selector: 'app-recover-pass-adm',
  templateUrl: './recover-pass-adm.component.html',
  styleUrls: ['./recover-pass-adm.component.scss']
})
export class RecoverPassAdmComponent implements OnInit {

  email: string = '';
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  sendEmail(){
    if(this.email != ""){
      this.authService.recoverPass(this.email).then(()=>{
        this.sendRecover()
        this.router.navigate(['/home-adm'])
      }).catch(()=>{
        this.errorUser();
      })
    } else {
      this.error();
    }
  }
  sendRecover(){
    this._snackBar.open('Te enviamos un correo electrónico, seguí las intrucciones para restablecer la contraseña','',{
      duration:6000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: "verificado",
    })
  }
  errorUser(){
    this._snackBar.open('Error, mail no registrado','',{
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: "error",
    })
  }
error(){
  this._snackBar.open('Debe ingresar un correo electónico','',{
    duration:3000,
    verticalPosition:'top',
    horizontalPosition:'right',
    panelClass: "alerta"
  })
}
}
