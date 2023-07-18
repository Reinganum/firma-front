import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';
import { KeycloakService } from './services/keycloak.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppComponent } from './app.component';
import { NoAutorizadoComponent } from './components/public/no-autorizado/no-autorizado.component';
import { ConfirmacionFirmaDocumentoComponent } from './components/modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { RechazarFirmaDocumentoComponent } from './components/modals/rechazar-firma-documento/rechazar-firma-documento.component';
import {CoreDirectivesModule} from "./directives/directives";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';
import { ObtenerRutComponent } from './components/modals/obtener-rut/obtener-rut.component';
import { AuthInterceptor, ErrorInterceptor } from './components/auth/helpers';

export function kcFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  },
  firstDayOfWeek: 1
};
@NgModule({
  declarations: [
    AppComponent,
    NoAutorizadoComponent,
    RechazarFirmaDocumentoComponent,
    ConfirmacionFirmaDocumentoComponent,
    ObtenerRutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreDirectivesModule,
    NgbModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true
  })
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEsCL, 'es-CL', {
      'groups': ['.', ',', 0]
    });
  }
}
