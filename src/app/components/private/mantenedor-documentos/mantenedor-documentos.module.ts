import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material.module";
import { RouterModule, Routes } from "@angular/router";
import { CoreDirectivesModule } from "src/app/directives/directives";
import { MantenedorDocumentosComponent } from "./mantenedor-documentos.component";

const routes: Routes = [
  { path: '', outlet: 'pages', component: MantenedorDocumentosComponent }
];

@NgModule({
  declarations: [
    MantenedorDocumentosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    CoreDirectivesModule
  ],
  exports: [
    MantenedorDocumentosComponent
  ]
})

export class MantenedorDocumentosModule {}
