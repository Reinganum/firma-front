import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(
    private http: HttpClient
  ) { }

  listarDocumentos(): Observable<any[]>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/obtenerDocumentos`);
  }
}
