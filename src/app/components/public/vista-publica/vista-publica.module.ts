import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MaterialModule } from "src/app/material.module";
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { VistaPublicaComponent } from "./vista-publica.component";
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
  { path: '', component: VistaPublicaComponent }
];

@NgModule({
  declarations: [
    VistaPublicaComponent,
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    RouterModule.forChild(routes),
    MatIconModule
  ],
  exports: [
    VistaPublicaComponent
  ]
})

export class VistaPublicaModule {}
