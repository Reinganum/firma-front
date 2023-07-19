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

  listarDocumentos(pageOffset:any, pageLimit:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/obtenerDocumentos?pageOffset=${pageOffset}&pageLimit=${pageLimit}`);
  }

  listaDocId(idDoc:number): Observable<any>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/getDocumentoId?idDoc=${idDoc}`);
  }

  crearPdfFirma(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.USUARIOS}/documentos/pdfFirma`, body, {headers})
  }
}
