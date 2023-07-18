import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MaterialModule } from "src/app/material.module";
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { VistaDocumentoComponent } from "./vista-documento.component";
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
  { path: '', outlet: 'pages', component: VistaDocumentoComponent }
];

@NgModule({
  declarations: [
    VistaDocumentoComponent,
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    RouterModule.forChild(routes),
    MatIconModule
  ],
  exports: [
    VistaDocumentoComponent
  ]
})

export class VistaDocumentoModule {}
