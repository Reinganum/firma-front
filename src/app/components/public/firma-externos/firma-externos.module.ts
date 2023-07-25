import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MaterialModule } from "src/app/material.module";
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { FirmaExternosComponent } from "./firma-externos.component";
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
  { path: '', component: FirmaExternosComponent }
];

@NgModule({
  declarations: [
    FirmaExternosComponent,
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MaterialModule
  ],
  exports: [
    FirmaExternosComponent
  ]
})

export class FirmaExternosModule {}
