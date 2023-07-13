      import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentosFirmarComponent } from "./documentos-firmar.component";
import { DatosFirmaComponent } from "../datos-firma/datos-firma.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', outlet: 'pages', component: DocumentosFirmarComponent }
  ];

@NgModule({
  declarations: [
    DocumentosFirmarComponent,
    DatosFirmaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DocumentosFirmarComponent
  ]
})

export class DocumentosFirmarModule { }
