import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) {}

  listarUsuarios(pageOffset:number, pageLimit:number ): Observable<any[]>{
    return this.http.get<any>(`${environment.API_DOMAINS.USUARIOS}/usuarios/listaUsuarios?pageOffset=${pageOffset}&pageLimit=${pageLimit}`);
  }

  mantenerUsuario(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.USUARIOS}/usuarios/mantenerUsuario`, body, {headers})
  }

  entregarAcceso(data:any):Observable<any>{
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.put(`${environment.API_DOMAINS.USUARIOS}/usuarios/mantenerUsuario`, body, {headers})
  }
}
