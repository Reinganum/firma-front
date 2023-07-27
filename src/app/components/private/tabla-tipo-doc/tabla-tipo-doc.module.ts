import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material.module";
import { CoreDirectivesModule } from "src/app/directives/directives";
import { TablaTipoDocComponent } from "./tabla-tipo-doc.component";

@NgModule({
    declarations: [
      TablaTipoDocComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      CoreDirectivesModule
    ],
    exports: [
        TablaTipoDocComponent
    ]
  })

export class TablaTipoDocModule { }