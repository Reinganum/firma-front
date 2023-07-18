import { NgModule } from "@angular/core";
import { MantenedorUsuariosComponent } from "./mantenedor-usuarios.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material.module";
import { RouterModule, Routes } from "@angular/router";
import { CoreDirectivesModule } from "src/app/directives/directives";

const routes: Routes = [
  { path: '', outlet: 'pages', component: MantenedorUsuariosComponent }
];

@NgModule({
  declarations: [
    MantenedorUsuariosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    CoreDirectivesModule
  ],
  exports: [
    MantenedorUsuariosComponent
  ]
})

export class MantenedorUsuariosModule {}
