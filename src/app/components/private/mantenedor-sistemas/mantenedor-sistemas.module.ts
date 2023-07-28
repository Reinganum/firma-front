import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material.module";
import { RouterModule, Routes } from "@angular/router";
import { CoreDirectivesModule } from "src/app/directives/directives";
import { MantenedorSistemasComponent } from "./mantenedor-sistemas.component";
import { TablaOrigenesModule } from "../tabla-origenes/tabla-origenes.module";
import { TablaTipoDocModule } from "../tabla-tipo-doc/tabla-tipo-doc.module";


const routes: Routes = [
  { path: '', outlet: 'pages', component: MantenedorSistemasComponent }
];

@NgModule({
  declarations: [
    MantenedorSistemasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    CoreDirectivesModule,
    TablaOrigenesModule,
    TablaTipoDocModule
  ],
  exports: [
    MantenedorSistemasComponent
  ]
})

export class MantenedorSistemasModule {}
