import { NgModule, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentosFirmarComponent } from "./documentos-firmar.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MaterialModule } from "src/app/material.module";
import { DatosFirmaModule } from "../datos-firma/datos-firma.module";

const routes: Routes = [
    { path: '', outlet: 'pages', component: DocumentosFirmarComponent }
  ];

@NgModule({
  declarations: [
    DocumentosFirmarComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
    DatosFirmaModule
  ],
  exports: [
    DocumentosFirmarComponent
  ]
})

export class DocumentosFirmarModule { }
