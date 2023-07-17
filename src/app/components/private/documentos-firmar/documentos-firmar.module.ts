import { NgModule, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentosFirmarComponent } from "./documentos-firmar.component";
import { DatosFirmaComponent } from "../datos-firma/datos-firma.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";

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
    RouterModule.forChild(routes),
    FormsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    DocumentosFirmarComponent
  ]
})

export class DocumentosFirmarModule { }
