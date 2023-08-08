import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(
    private http: HttpClient
  ) { }

  listaMedios(): Observable<any>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/listarMediosGestion`);
  }

  editarMedio(data:any): Observable<any> {        
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.put(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/editarMedio`, body, {headers})
  }

  crearMedio(data:any): Observable<any> {    
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/crearMedio`, body, {headers})
  }

  listaTipoDocumentos(): Observable<any>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/listarTipoDoc`);
  }

  editarTipoDocumento(data:any): Observable<any> {        
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/editarTipoDoc`, body, {headers})
  }

  crearTipoDocumento(data:any): Observable<any> {    
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/crearTipoDoc`, body, {headers})
  }

  filtrarMedios(data:any){
    console.log(data)
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/filtrarMedios?nombre=${data.nombre}&estado=${data.estado}`);
  }
}
