import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MotoresService {
  http: HttpClient;
  constructor(
    http: HttpClient) {
      this.http = http;
  }
  motorValidacion(entidad: any): Observable<any> {
    const body = JSON.stringify(entidad);
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_MOTORES.MV}`, body, { headers });
  }
}