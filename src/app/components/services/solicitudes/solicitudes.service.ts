import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Solicitudes {
    id?: string;
    fecha?: string;
    nombre?: string ;
    apellido?: string;
    uid?: string;
    tipo?: string;
    email?: string;
    datoACambiar?: string;
}

@Injectable({
    providedIn: 'root'
})
export class SolicitudesService {

    url: any;
    solicitudes: Solicitudes[]= [];

    constructor( private http: HttpClient){
        this.url= environment.apiEndpoint;
    }

    getSolicitudes(): Observable<any>{
        return this.http.get(this.url+'/solicitudes/listado');
    }

    deleteSolicitud(id:any){
        return this.http.delete(this.url+'/solicitudes/'+ id)
    }

    verSolicitud(id: any): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + '/solicitudes/listado/' + id, {
            headers: headers,
    })
    }

    solicitudCambio(params:any): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url + '/solicitudes', params,{
            headers: headers
        })
    }
}