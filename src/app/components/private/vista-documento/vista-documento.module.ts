import { NgModule } from "@angular/core";
import { VistaDocumentoComponent } from "./vista-documento.component";
import { CommonModule } from "@angular/common";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', outlet: 'pages', component: VistaDocumentoComponent }
];

@NgModule({
  declarations: [
    VistaDocumentoComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    VistaDocumentoComponent
  ]
})

export class VistaDocumentoModule {}
