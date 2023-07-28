import { NgModule } from "@angular/core";
import { TablaOrigenesComponent } from "./tabla-origenes.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material.module";
import { CoreDirectivesModule } from "src/app/directives/directives";

@NgModule({
    declarations: [
      TablaOrigenesComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      CoreDirectivesModule
    ],
    exports: [
        TablaOrigenesComponent
    ]
  })

export class TablaOrigenesModule { }