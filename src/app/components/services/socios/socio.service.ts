import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SociosService {

    url: any;

    constructor(
    public http: HttpClient) { 
    
    this.url= environment.apiEndpoint;
    }

    /*Crear un socio componente alta*/
    crear_socio(params={}):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.post(this.url + '/socios', params,{
            headers: headers
        });
    }

    /*Ver todos los socios de Firebase*/
    verUserFirebase(): Observable <any>{
        return this.http.get(this.url + '/users');
    }

    /*Ver todos los socios*/
    ver_socios(){
        return this.http.get(this.url + '/socios/listado');
    }

    /*Ver un solo socio por dni*/
    ver_un_socio(id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + '/socios/' + id, {
            headers: headers,
        });
    }

    /*No en funcionamiento*/
    ver_solosocio(dni:any){
        return this.http.get(this.url + '/socios/',dni);
    }

    /*Modificar socio en componentes de editar*/
    modificar_socio(params: any, uid:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.put(this.url + '/socios/' + uid, params,{
            headers: headers,
        });
    }

    /*Eliminar socio */
    eliminarSocio(id: any):Observable<any>{
        return this.http.delete(this.url + '/socios/' + id);
    }
    
}