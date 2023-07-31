import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComunesService {

  constructor(
    private http: HttpClient
  ) { }

  getSignedUrl(data: any): Observable<any> {
    const body = JSON.stringify(data);
    console.log(body);
    
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${environment.API_DOMAINS.COMUNES}/getSignedUrl`, body, {headers});
  }
  firma(data: any): Observable<any> {
    const body = JSON.stringify(data);
    console.log(body);
    
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`https://firma-api.0s.cl/firmar-pdf`, body, {headers});
  }


}
