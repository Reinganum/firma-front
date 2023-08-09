import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService,
    private _authenticationService: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValue ? this._authenticationService.currentUserValue: localStorage.getItem("tokenUrl");
    let token;
    let isLoggedIn;
    if (currentUser) {
      token = currentUser.token ? currentUser.token : localStorage.getItem("tokenUrl");
      isLoggedIn = currentUser && token;
    }

    // const isApiUrl = req.url.startsWith(environment.APIS.SERVICIOS);



    let agregaTokenURL = true;
    const txtUrlsExcluidas = [
      '.s3.amazonaws.com',
      // 'maps.googleapis.com'
    ];
    // Determina si a la url no se le debe agregar el token
    for (const txt of txtUrlsExcluidas) {
      if (req.url.split(txt).length > 1) {
        agregaTokenURL = false;
        break;
      }
    }
    let request = req;

    if (agregaTokenURL) {
      if (isLoggedIn) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(req);
  }

}
