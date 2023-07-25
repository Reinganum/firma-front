import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { MaterialModule } from "src/app/material.module";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JwtModule } from "@auth0/angular-jwt";

import { VistaPublicaComponent } from "./vista-publica.component";


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
    MatIconModule,
    MaterialModule,
    JwtModule
  ],
  exports: [
    VistaPublicaComponent
  ]
})

export class VistaPublicaModule {}
