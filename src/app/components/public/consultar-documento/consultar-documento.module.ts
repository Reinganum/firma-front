import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ConsultarDocumentoComponent } from "./consultar-documento.component";
import { MaterialModule } from "src/app/material.module";
import { ToastrModule } from "ngx-toastr";

const routes: Routes = [{ path: '', component: ConsultarDocumentoComponent }];

@NgModule({
  declarations: [ConsultarDocumentoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  exports: [ConsultarDocumentoComponent]
})

export class ConsultarDocumentoModule { }
