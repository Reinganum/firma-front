import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirmantesService {

  constructor(private http: HttpClient) { }

  editarFirmante(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.put(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/editarFirmante`, body, {headers})
  }

  getFirmante(email:any): Observable<any[]> {
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/getFirmante?email=${email}`);
  }
}
