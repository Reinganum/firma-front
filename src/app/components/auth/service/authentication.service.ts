import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { KeycloakService } from "src/app/services/keycloak.service";
import { UsuariosService } from "src/app/services/usuarios.service";
// import * as moment from "moment";
import { LocalStorageService } from "angular-web-storage";
import { Router } from "@angular/router";
// import Swal, { SweetAlertResult } from "sweetalert2";
// import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  //public
  public currentUser: Observable<any>;

  //private
  private currentUserSubject: BehaviorSubject<any>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    // private _http: HttpClient,
    private usuariosService: UsuariosService,
    private keycloak: KeycloakService,
    private router: Router,
    // private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(<string>localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isTokenNoValid() {
    try {
      return this.keycloak.isTokenExpired();
    } catch (e) {
      return true;
    }
  }

  isTokenNoValidWithToken() {
    return this.keycloak.isTokenExpiredWithToken();
  }

  login() {
    let opciones = { idpHint: "google" };
    return this.keycloak.createLoginUrl(opciones);
  }

  setUser() {
    return new Promise((resolve, reject) => {
      this.keycloak.loadUserInfo().then((userGET: any) => {
        let user = userGET;
        user.token = this.keycloak.getToken();
        if (user && user.token) {
          this.currentUserSubject.next(user);
          resolve(user)
        } else {
          reject(user);
        }
      });
    });
  }

  getToken() {
    return this.keycloak.getToken();
  }

  refreshToken() {
    return this.keycloak.refreshToken();
  }

  /**
   * User logout
   *
   */
  async logout() {
    try {
      // remove user from local storage to log user out
      localStorage.clear();
      localStorage.removeItem('currentUser');
      if (await this.keycloak.loadUserInfo()) {
        this.keycloak.logout();
      }
      // notify
      this.currentUserSubject.next(null);
    } catch (e) {
      this.currentUserSubject.next(null);
    }
  }
}
