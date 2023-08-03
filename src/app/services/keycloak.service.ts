import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

declare const Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloakAuth: any;

  public init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        url: environment.sso.url,
        realm: environment.sso.realm,
        clientId: environment.sso.clientId,
        credentials: environment.sso.credentials,
        'ssl-required': 'external',
        'confidential-port': 0
      };
      const initOptions = {
        responseMode: 'fragment',
        flow: 'standard',
        //onLoad: 'login-required',
        onLoad: 'check-sso',
        checkLoginIframe: false
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init(initOptions)
        .success(() => {
          resolve(true);
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): string {
    return this.keycloakAuth.token;
  }

  refreshToken(){
    return this.keycloakAuth.updateToken(-1);
  }
  loadUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloakAuth.loadUserProfile().success((profile:any) => {
        resolve(profile);
      }).error(() => {
        reject();
        // this.toastr.warn('Ocurrio un problema al obtener los datos del usuario');

      });
    });
  }

  loadUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloakAuth.loadUserInfo().success((user:any) => {
        resolve(user);
      }).error(() => {
        reject();
        // this.toastr.warn('Ocurrio un problema al obtener los datos del usuario');

      });
    });
  }

  
  logout() {
    const logout= this.keycloakAuth.createLogoutUrl({redirectUri:`${window.location.protocol}//${window.location.host}/login`});
    console.log('logout',logout);
    window.location.href = logout;
    // return logout;
}

  createLoginUrl(opciones:any) {
    console.log(opciones);
    return this.keycloakAuth.createLoginUrl(opciones);
  }

  login(opciones:any) {
    return this.keycloakAuth.login(opciones);
  }
 loginForm(options:any) {
    return this.keycloakAuth.loginForm(options);
  }

  isTokenExpired(){
    return this.keycloakAuth.isTokenExpired();
  }

  isTokenExpiredWithToken(){
    return this.keycloakAuth.isTokenExpiredWithToken();
  }
}
