import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "https://identitytoolkit.googleapis.com/v1/";
  apiKey: string = "AIzaSyDZzWPSAVYGOYRUex7SeiiPOgfczp7H8Hg";
  url: string = "https://techo-app.herokuapp.com";
  //token: string | undefined;

  constructor(private http: HttpClient,
              private router: Router,
              private auth: AngularFireAuth,
              private db: AngularFirestore
) { }

  registerSocio(user: any): Observable<any>{
    let body = user;
    return this.http.post(this.apiUrl + "accounts:signUp?key=" + this.apiKey, body,{
    });
  }

  login(email:any,password:any){
    return new Promise((resuelto, err)=>{
      this.auth.signInWithEmailAndPassword(email,password).then(user =>{
        resuelto(user);
      }).catch(error => err(error));
    })
  }

  getUsers(): Observable <any>{
    return this.http.get(this.url + '/users');
  }

  verifyToken(token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + `/users/autenticar/:idToken${token}`,{
      headers: headers
    },)
  }

  logout(){
    this.auth.signOut().then(()=>{
      this.router.navigate(['/']);
    })
  }

  recoverPass(email: string): any{
    return this.auth.sendPasswordResetEmail(email);
  }

  getToken(): any {
    let token = localStorage.getItem('token');
    if (token != undefined){
      return token;
    }
    return null;
  }

  isAdmin(): any {
    let claim = localStorage.getItem('tipoDeUsuario');
    if (claim == 'admin'){
      return claim
    }
    return null
  }
}
