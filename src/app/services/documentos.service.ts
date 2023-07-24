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
  listarDocumentos(pageOffset:any, pageLimit:any, origen?:any,fechaDoc?:any,rut?:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/obtenerDocumentos?pageOffset=${pageOffset}&pageLimit=${pageLimit}&origen=3&fechaDoc=05-07-2023`);
  }

  listaDocId(idDoc:number): Observable<any>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/getDocumentoId?idDoc=${idDoc}`);
  }

  crearPdfFirma(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/pdfFirma`, body, {headers})
  }

  documentosPendientes(estado:any, responsable:any): Observable<any[]>{
    console.log(estado,responsable)
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/documentosPendientes?estado=${estado}&responsable=${responsable}`);
  }

  // a la nueva db

  obtenerDocumentos(medio:any, fecha:any, sortDirection:any, sortField:any, pageOffset:any, pageLimit:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/listaDocs?medio=${medio}&fecha=${fecha}&sortField=${sortField}&sortDirection=${sortDirection}&pageLimit=${pageLimit}&pageOffset=${pageOffset}`);
  }

  crearDocumento(data:any): Observable<any> {    
    
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/ingresarDocumento`, body, {headers})
  }
}
