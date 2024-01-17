import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private notificationsSubject = new BehaviorSubject<any>({});
  public notificationsCount$ = this.notificationsSubject.asObservable();
  private docsPendientes: any[] = [];
  private origenes!:any;
  private notis!:any
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

  documentosPendientes(responsable:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/pendientes?responsable=${responsable}`);
  }
  

  // a la nueva db

  obtenerDocumentos(responsable:any, estado:any, medio:any, fecha:any, sortDirection:any, sortField:any, pageOffset:any, pageLimit:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/listaDocs?responsable=${responsable}&estado=${estado}&medio=${medio}&fecha=${fecha}&sortField=${sortField}&sortDirection=${sortDirection}&pageLimit=${pageLimit}&pageOffset=${pageOffset}`);
  }

  crearDocumento(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/ingresarDocumento`, body, {headers})
  }

  editarDocumento(data:any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/editarDocumento`, body, {headers})
  }

  getNotificaciones(responsable:any){
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/notificaciones?responsable="${responsable}"`);
  }

  listaDocHash(docHash:any): Observable<any>{
    return this.http.get<any>(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/getDocumentoHash?docHash=${docHash}`);
  }

  crearNotificacion(data:any): Observable<any> {    
    const body = JSON.stringify(data);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.DOCUMENTOS}/documentos/crearNotificacion`, body, {headers})
  }

  updateNotificationCount(notis: any) {
    this.notificationsSubject.next(notis);
  }

  setDocPendientes(data: any[]) {
    this.docsPendientes = data;
  }

  getDocsPendientes() {
    return this.docsPendientes;
  }

  setNotis(data: any[]) {
    this.notis = data;
  }

  getNotis() {
    return this.notis;
  }

  setOrigenes(data: any) {
    this.origenes = data;
  }

  getOrigenes() {
    return this.origenes;
  }
}
