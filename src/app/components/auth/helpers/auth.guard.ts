import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  UrlSegment,
  UrlTree, Route
} from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;

    if (currentUser) {
      if (!this._authenticationService.isTokenNoValid()) {
        // check if route is restricted by role
        console.log('1');
       // const rolePre = currentUser.roles.find((r: any) => r.predeterminado == true);
       /* if (route.data['roles'] && route.data['roles'].indexOf(rolePre.nombre) === -1) {
          // role not authorised so redirect to not-authorized page
          this._router.navigate(['/not-authorized']);
          return false;
        } */

        // authorised so return true
        return true;
      }else{
        console.log('redirigiendo')
        this._router.navigate(['/login'], {preserveFragment:true, queryParams: { returnUrl: state.url } });
        return false;
      }
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this._authenticationService.currentUserValue;
    if (currentUser) {
      if (!this._authenticationService.isTokenNoValid()) {
        // authorised so return true
        return true;
      }else{
        this._router.navigate(['/login'], {preserveFragment:true});
        return false;
      }
    }
    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], {preserveFragment:true});
    return false;
  }
}
