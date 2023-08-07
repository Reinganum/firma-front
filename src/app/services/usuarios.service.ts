import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  crearUsuario(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${environment.API_DOMAINS.USUARIOS}/usuarios/crearUsuario`, body, { headers })
  }

  listarUsuarios(pageOffset: number, pageLimit: number): Observable<any[]> {
    return this.http.get<any>(`${environment.API_DOMAINS.USUARIOS}/usuarios/listaUsuarios?pageOffset=${pageOffset}&pageLimit=${pageLimit}`);
  }

  mantenerUsuario(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${environment.API_DOMAINS.USUARIOS}/usuarios/mantenerUsuario`, body, { headers })
  }

  entregarAcceso(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    console.log(data)
    return this.http.post(`${environment.API_DOMAINS.USUARIOS}/usuarios/mantenerUsuario`, body, { headers })
  }

  verificarToken(token: any): Observable<any> {
    const body = JSON.stringify(token);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${environment.API_DOMAINS.USUARIOS}/usuarios/verificarToken`, body, { headers })
  }

  eliminarUsuario(userId:any){
    return this.http.delete<any>(`${environment.API_DOMAINS.USUARIOS}/usuarios/eliminarUsuario?userId=${userId}`);
  }
  
  filtrarUsuarios(pageOffset: any, pageLimit: any,rut:any,nombre:any,email:any,estado:any){
    console.log(rut, nombre, email, estado)
    return this.http.get<any>(`${environment.API_DOMAINS.USUARIOS}/usuarios/filtrarUsuarios?pageOffset=${pageOffset}&pageLimit=${pageLimit}&nombre=${nombre}&email=${email}&rut=${rut}&estado=${estado}`);
  }
}
