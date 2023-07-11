import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoAutorizadoComponent } from './components/public/no-autorizado/no-autorizado.component';
import { ConfirmacionFirmaDocumentoComponent } from './components/modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { RechazarFirmaDocumentoComponent } from './components/modals/rechazar-firma-documento/rechazar-firma-documento.component';
import { FormularioFirmaDocumentoComponent } from './components/modals/formulario-firma-documento/formulario-firma-documento.component';
import {CoreDirectivesModule} from "./directives/directives";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NoAutorizadoComponent,
    RechazarFirmaDocumentoComponent,
    ConfirmacionFirmaDocumentoComponent,
    FormularioFirmaDocumentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreDirectivesModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
