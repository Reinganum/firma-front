import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  constructor(
    private http: HttpClient
  ) { }

  // Recibe como parámetros de entrada
  // email:string,
  // asunto:string,
  // seguimiento:string
  notificarDocFirmado(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.CORREOS}/correos/avisoFirmado`, body, {headers})
  }

  // Recibe como parámetros de entrada
  // email:string,
  // asunto:string,
  // nombre:string
  notificarDocAFirmar(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.CORREOS}/correos/docAFirmar`, body, {headers})
  }
}
