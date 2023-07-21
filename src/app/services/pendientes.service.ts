import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PendientesService {
  private docsPendientes: any[] = [];

  constructor() {}

  setDocPendientes(data: any[]) {
    this.docsPendientes = data;
  }
  
  getDocsPendientes() {
    return this.docsPendientes;
  }
}