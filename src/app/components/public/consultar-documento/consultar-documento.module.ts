import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ConsultarDocumentoComponent } from "./consultar-documento.component";
import { MaterialModule } from "src/app/material.module";

const routes: Routes = [{ path: '', component: ConsultarDocumentoComponent }];

@NgModule({
  declarations: [ConsultarDocumentoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [ConsultarDocumentoComponent]
})

export class ConsultarDocumentoModule { }
